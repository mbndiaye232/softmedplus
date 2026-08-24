const { logAudit } = require('../middleware/audit');
const crypto = require('crypto');

// 1. Create Stock Item (medication or consumable template)
const createStockItem = async (req, res) => {
  const { sku, name, category, unit, minimum_threshold_alert, unit_cost_price, selling_price } = req.body;

  if (!sku || !name || !category || !unit || !unit_cost_price || !selling_price) {
    return res.status(400).json({ error: 'Required fields missing: sku, name, category, unit, unit_cost_price, selling_price' });
  }

  const tenantId = req.user.tenant_id;

  try {
    const result = await req.dbClient.query(
      `INSERT INTO stock_items (tenant_id, sku, name, category, unit, minimum_threshold_alert, unit_cost_price, selling_price, current_stock_quantity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0)
       RETURNING *`,
      [
        tenantId,
        sku.toUpperCase().trim(),
        name,
        category,
        unit,
        parseInt(minimum_threshold_alert || 10),
        parseFloat(unit_cost_price),
        parseFloat(selling_price)
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create stock item error:', err.message);
    if (err.message.includes('unique_tenant_sku')) {
      return res.status(409).json({ error: 'An item with this SKU is already registered in your inventory' });
    }
    return res.status(500).json({ error: 'Failed to create stock item' });
  }
};

// 2. Add Stock Lot (purchasing/restocking)
const addStockLot = async (req, res) => {
  const { stock_item_id, lot_number, expiration_date, quantity } = req.body;

  if (!stock_item_id || !lot_number || !expiration_date || !quantity) {
    return res.status(400).json({ error: 'Required fields missing: stock_item_id, lot_number, expiration_date, quantity' });
  }

  const tenantId = req.user.tenant_id;
  const userId = req.user.id;

  try {
    // Start by locking and verifying the stock item
    const itemRes = await req.dbClient.query(
      `SELECT * FROM stock_items WHERE id = $1 AND tenant_id = $2 FOR UPDATE`,
      [stock_item_id, tenantId]
    );

    if (itemRes.rowCount === 0) {
      return res.status(404).json({ error: 'Stock item not found' });
    }

    const item = itemRes.rows[0];
    const qtyInt = parseInt(quantity);

    // A. Insert Lot
    const lotId = crypto.randomUUID();
    const lotRes = await req.dbClient.query(
      `INSERT INTO stock_lots (id, tenant_id, stock_item_id, lot_number, expiration_date, quantity_remaining)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        lotId,
        tenantId,
        stock_item_id,
        lot_number,
        expiration_date,
        qtyInt
      ]
    );

    // B. Record Stock Movement
    await req.dbClient.query(
      `INSERT INTO stock_movements (tenant_id, stock_item_id, lot_id, movement_type, quantity, performed_by)
       VALUES ($1, $2, $3, 'PURCHASE_RECEIPT', $4, $5)`,
      [tenantId, stock_item_id, lotId, qtyInt, userId]
    );

    // C. Update stock item quantity total
    const updatedItem = await req.dbClient.query(
      `UPDATE stock_items 
       SET current_stock_quantity = current_stock_quantity + $1
       WHERE id = $2
       RETURNING *`,
      [qtyInt, stock_item_id]
    );

    await logAudit(req, 'ADD_STOCK_LOT', 'stock_lots', lotId);

    return res.status(201).json({
      lot: lotRes.rows[0],
      item: updatedItem.rows[0]
    });

  } catch (err) {
    console.error('Add stock lot error:', err.message);
    return res.status(500).json({ error: 'Failed to add stock lot' });
  }
};

// 3. Atomically Deplete Stock (FEFO: First Expired First Out)
const depleteStock = async (req, res) => {
  const { stock_item_id, quantity, reference_id } = req.body;

  if (!stock_item_id || !quantity) {
    return res.status(400).json({ error: 'Required fields: stock_item_id, quantity' });
  }

  const tenantId = req.user.tenant_id;
  const userId = req.user.id;
  const qtyToDeplete = parseInt(quantity);

  if (qtyToDeplete <= 0) {
    return res.status(400).json({ error: 'Quantity must be positive' });
  }

  try {
    // A. Lock stock item row to prevent concurrent race conditions
    const itemRes = await req.dbClient.query(
      `SELECT * FROM stock_items WHERE id = $1 AND tenant_id = $2 FOR UPDATE`,
      [stock_item_id, tenantId]
    );

    if (itemRes.rowCount === 0) {
      return res.status(404).json({ error: 'Stock item not found' });
    }

    const item = itemRes.rows[0];

    // B. Fetch all active, non-expired lots ordered by expiration date (FEFO)
    const today = new Date().toISOString().split('T')[0];
    const lotsRes = await req.dbClient.query(
      `SELECT * FROM stock_lots 
       WHERE stock_item_id = $1 AND tenant_id = $2 AND expiration_date >= $3 AND quantity_remaining > 0
       ORDER BY expiration_date ASC FOR UPDATE`,
      [stock_item_id, tenantId, today]
    );

    let totalAvailable = 0;
    lotsRes.rows.forEach(lot => {
      totalAvailable += lot.quantity_remaining;
    });

    // C. Assert sufficient stock exists across all valid lots
    if (totalAvailable < qtyToDeplete) {
      return res.status(422).json({
        error: `422 Unprocessable Entity - Insufficient Stock. Requested ${qtyToDeplete}, but only ${totalAvailable} units are available in unexpired lots.`
      });
    }

    // D. Perform FEFO depletion loop
    let remainingToDeduct = qtyToDeplete;
    for (const lot of lotsRes.rows) {
      if (remainingToDeduct <= 0) break;

      const deductFromThisLot = Math.min(lot.quantity_remaining, remainingToDeduct);

      // Update lot remaining quantity
      await req.dbClient.query(
        `UPDATE stock_lots SET quantity_remaining = quantity_remaining - $1 WHERE id = $2 AND tenant_id = $3`,
        [deductFromThisLot, lot.id, tenantId]
      );

      // Log movement (negative value for stock output)
      await req.dbClient.query(
        `INSERT INTO stock_movements (tenant_id, stock_item_id, lot_id, movement_type, quantity, reference_id, performed_by)
         VALUES ($1, $2, $3, 'CONSULTATION_USAGE', $4, $5, $6)`,
        [tenantId, stock_item_id, lot.id, -deductFromThisLot, reference_id || null, userId]
      );

      remainingToDeduct -= deductFromThisLot;
    }

    // E. Update total stock count on item
    const updatedItemRes = await req.dbClient.query(
      `UPDATE stock_items 
       SET current_stock_quantity = current_stock_quantity - $1
       WHERE id = $2 AND tenant_id = $3
       RETURNING *`,
      [qtyToDeplete, stock_item_id, tenantId]
    );

    await logAudit(req, 'DEPLETE_STOCK', 'stock_items', stock_item_id);

    return res.status(200).json({
      message: 'Stock depleted successfully',
      item: updatedItemRes.rows[0]
    });

  } catch (err) {
    console.error('Deplete stock error:', err.message);
    return res.status(500).json({ error: 'Failed to deplete stock' });
  }
};

// 4. Get Stock items list
const getStockItems = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM stock_items WHERE tenant_id = $1 ORDER BY name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get stock items error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve stock list' });
  }
};

module.exports = {
  createStockItem,
  addStockLot,
  depleteStock,
  getStockItems
};
