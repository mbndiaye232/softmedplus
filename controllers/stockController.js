const { logAudit } = require('../middleware/audit');
const crypto = require('crypto');

// 1. Create Stock Item (medication or consumable template)
const createStockItem = async (req, res) => {
  const { sku, name, category, target_specialty, default_dosage, unit, minimum_threshold_alert, unit_cost_price, selling_price } = req.body;

  if (!sku || !name || !category || !unit || !unit_cost_price || !selling_price) {
    return res.status(400).json({ error: 'Champs requis manquants : sku, name, category, unit, unit_cost_price, selling_price' });
  }

  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  try {
    const result = await req.dbClient.query(
      `INSERT INTO stock_items (tenant_id, sku, name, category, target_specialty, default_dosage, unit, minimum_threshold_alert, unit_cost_price, selling_price, current_stock_quantity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0)
       RETURNING *`,
      [
        tenantId,
        sku.toUpperCase().trim(),
        name.trim(),
        category,
        (target_specialty || 'GENERAL').toUpperCase().trim(),
        default_dosage ? default_dosage.trim() : null,
        unit.trim(),
        parseInt(minimum_threshold_alert || 10),
        parseFloat(unit_cost_price),
        parseFloat(selling_price)
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create stock item error:', err.message);
    if (err.message && err.message.includes('unique_tenant_sku')) {
      return res.status(409).json({ error: 'Un article avec ce SKU existe déjà dans votre inventaire' });
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

  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
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

  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
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

// 4. Get Stock items list (optionally filtered by practitioner specialty: returns specialty specific items + general medications)
const getStockItems = async (req, res) => {
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const { specialty, category } = req.query;

  try {
    let result;
    if (specialty && specialty.trim()) {
      const spec = specialty.toUpperCase().trim();
      result = await req.dbClient.query(
        `SELECT * FROM stock_items 
         WHERE tenant_id = $1 AND is_active = true 
           AND (
             UPPER(COALESCE(target_specialty, 'GENERAL')) = $2 
             OR UPPER(COALESCE(target_specialty, 'GENERAL')) IN ('GENERAL', 'MED-GEN', 'TOUS')
             OR target_specialty IS NULL 
             OR target_specialty = ''
           )
         ORDER BY (UPPER(COALESCE(target_specialty, 'GENERAL')) = $2) DESC, name ASC`,
        [tenantId, spec]
      );
    } else {
      result = await req.dbClient.query(
        `SELECT * FROM stock_items WHERE tenant_id = $1 ORDER BY is_active DESC, name ASC`,
        [tenantId]
      );
    }
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get stock items error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve stock list' });
  }
};

// 5. Update Stock Item
const updateStockItem = async (req, res) => {
  const { id } = req.params;
  const { sku, name, category, target_specialty, default_dosage, unit, minimum_threshold_alert, unit_cost_price, selling_price, is_active } = req.body;

  if (!sku || !name || !category || !unit || unit_cost_price === undefined || selling_price === undefined) {
    return res.status(400).json({ error: 'Champs requis manquants : sku, name, category, unit, unit_cost_price, selling_price' });
  }

  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;
  const cleanSku = sku.toUpperCase().trim();
  const cleanName = name.trim();
  const cleanCategory = category.trim();
  const cleanSpec = (target_specialty || 'GENERAL').toUpperCase().trim();
  const cleanDosage = default_dosage ? default_dosage.trim() : null;
  const cleanUnit = unit.trim();
  const thresholdInt = parseInt(minimum_threshold_alert !== undefined ? minimum_threshold_alert : 10);
  const costPrice = parseFloat(unit_cost_price);
  const sellPrice = parseFloat(selling_price);

  if (isNaN(thresholdInt) || thresholdInt < 0) {
    return res.status(400).json({ error: "Le seuil d'alerte doit être un nombre positif ou nul" });
  }
  if (isNaN(costPrice) || costPrice < 0) {
    return res.status(400).json({ error: "Le prix d'achat doit être un montant valide" });
  }
  if (isNaN(sellPrice) || sellPrice < 0) {
    return res.status(400).json({ error: "Le prix de vente doit être un montant valide" });
  }

  try {
    // Check uniqueness of SKU within the tenant excluding this item
    const existingSku = await req.dbClient.query(
      `SELECT id FROM stock_items WHERE tenant_id = $1 AND sku = $2 AND id != $3`,
      [tenantId, cleanSku, id]
    );
    if (existingSku.rowCount > 0) {
      return res.status(409).json({ error: `Un autre article avec le SKU "${cleanSku}" existe déjà dans votre inventaire.` });
    }

    const isActiveBool = typeof is_active === 'boolean' ? is_active : (is_active === 'false' ? false : true);

    const result = await req.dbClient.query(
      `UPDATE stock_items
       SET sku = $1,
           name = $2,
           category = $3,
           target_specialty = $4,
           default_dosage = $5,
           unit = $6,
           minimum_threshold_alert = $7,
           unit_cost_price = $8,
           selling_price = $9,
           is_active = $10
       WHERE id = $11 AND tenant_id = $12
       RETURNING *`,
      [
        cleanSku,
        cleanName,
        cleanCategory,
        cleanSpec,
        cleanDosage,
        cleanUnit,
        thresholdInt,
        costPrice,
        sellPrice,
        isActiveBool,
        id,
        tenantId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Article introuvable' });
    }

    await logAudit(req, 'UPDATE_STOCK_ITEM', 'stock_items', id);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update stock item error:', err.message);
    if (err.message && err.message.includes('unique_tenant_sku')) {
      return res.status(409).json({ error: 'Un article avec ce SKU existe déjà dans votre inventaire' });
    }
    return res.status(500).json({ error: "Échec de modification de l'article de stock" });
  }
};

// 6. Delete Stock Item (with traceability protection & movement checks)
const deleteStockItem = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  try {
    // A. Check if item exists
    const itemRes = await req.dbClient.query(
      `SELECT id, sku, name, current_stock_quantity, is_active FROM stock_items WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    if (itemRes.rowCount === 0) {
      return res.status(404).json({ error: 'Article introuvable' });
    }

    const item = itemRes.rows[0];

    // B. Check if there is active stock remaining
    if (item.current_stock_quantity > 0) {
      return res.status(400).json({
        error: `Impossible de supprimer cet article car son stock actuel est de ${item.current_stock_quantity} unité(s). Vous devez d'abord décréter/solder le stock ou archiver l'article.`,
        can_archive: true,
        current_quantity: item.current_stock_quantity
      });
    }

    // C. Check if stock movements exist (historical traceability for medical / compliance audit)
    const movRes = await req.dbClient.query(
      `SELECT COUNT(*)::INT as count FROM stock_movements WHERE stock_item_id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    const movementCount = movRes.rows[0].count;

    if (movementCount > 0) {
      return res.status(400).json({
        error: `Impossible de supprimer définitivement "${item.name}" car ${movementCount} mouvement(s) de stock y sont rattachés (traçabilité médicale et comptable). Vous pouvez désactiver / archiver cet article à la place.`,
        can_archive: true,
        has_movements: true
      });
    }

    // D. Delete associated empty lots if any
    await req.dbClient.query(
      `DELETE FROM stock_lots WHERE stock_item_id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    // E. Perform physical deletion of stock item
    const deleteRes = await req.dbClient.query(
      `DELETE FROM stock_items WHERE id = $1 AND tenant_id = $2 RETURNING id, sku, name`,
      [id, tenantId]
    );

    await logAudit(req, 'DELETE_STOCK_ITEM', 'stock_items', id);

    return res.status(200).json({
      message: `L'article "${item.name}" (${item.sku}) a été supprimé définitivement avec succès.`,
      deleted_item: deleteRes.rows[0]
    });

  } catch (err) {
    console.error('Delete stock item error:', err.message);
    return res.status(500).json({ error: "Échec de suppression de l'article de stock" });
  }
};

// 7. Toggle Stock Item Active / Archived status
const toggleStockItemStatus = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenant_id || req.tenantId;

  try {
    const result = await req.dbClient.query(
      `UPDATE stock_items
       SET is_active = NOT is_active
       WHERE id = $1 AND tenant_id = $2
       RETURNING *`,
      [id, tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Article introuvable' });
    }

    const updated = result.rows[0];
    await logAudit(req, updated.is_active ? 'ACTIVATE_STOCK_ITEM' : 'ARCHIVE_STOCK_ITEM', 'stock_items', id);

    return res.status(200).json(updated);
  } catch (err) {
    console.error('Toggle stock item status error:', err.message);
    return res.status(500).json({ error: "Échec de mise à jour du statut de l'article" });
  }
};

module.exports = {
  createStockItem,
  addStockLot,
  depleteStock,
  getStockItems,
  updateStockItem,
  deleteStockItem,
  toggleStockItemStatus
};

