const crypto = require('crypto');

// 1. Get Patient Statuses for current tenant
const getStatuses = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM patient_statuses 
       WHERE tenant_id = $1 AND is_active = true 
       ORDER BY is_default DESC, name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get patient statuses error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve patient statuses' });
  }
};

// 2. Create Patient Status
const createStatus = async (req, res) => {
  const { name, code, color_code, is_default } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const tenantId = req.user.tenant_id;
  const statusId = crypto.randomUUID();
  const statusCode = code ? code.toUpperCase().replace(/\s+/g, '_') : name.toUpperCase().replace(/[^A-Z0-9]/gi, '_');
  const color = color_code || '#4A90E2';

  try {
    if (is_default) {
      // Unset any previous default status for this tenant
      await req.dbClient.query(
        `UPDATE patient_statuses SET is_default = false WHERE tenant_id = $1`,
        [tenantId]
      );
    }

    const result = await req.dbClient.query(
      `INSERT INTO patient_statuses (id, tenant_id, code, name, color_code, is_default, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, true)
       RETURNING *`,
      [statusId, tenantId, statusCode, name, color, !!is_default]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create patient status error:', err.message);
    if (err.message.includes('unique_tenant_status_code')) {
      return res.status(409).json({ error: 'A status with this code already exists' });
    }
    return res.status(500).json({ error: 'Failed to create patient status' });
  }
};

// 3. Update Patient Status
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { name, color_code, is_default, is_active } = req.body;

  const tenantId = req.user.tenant_id;

  try {
    if (is_default) {
      await req.dbClient.query(
        `UPDATE patient_statuses SET is_default = false WHERE tenant_id = $1`,
        [tenantId]
      );
    }

    const result = await req.dbClient.query(
      `UPDATE patient_statuses 
       SET name = COALESCE($1, name),
           color_code = COALESCE($2, color_code),
           is_default = COALESCE($3, is_default),
           is_active = COALESCE($4, is_active)
       WHERE id = $5 AND tenant_id = $6
       RETURNING *`,
      [name, color_code, is_default !== undefined ? is_default : null, is_active !== undefined ? is_active : null, id, tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Status not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update patient status error:', err.message);
    return res.status(500).json({ error: 'Failed to update patient status' });
  }
};

// 4. Delete / Deactivate Patient Status
const deleteStatus = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;

  try {
    // Check if any patients use this status
    const countRes = await req.dbClient.query(
      `SELECT COUNT(*) FROM patients WHERE status_id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );

    if (parseInt(countRes.rows[0].count) > 0) {
      // Soft-delete (set is_active = false) so history is preserved
      await req.dbClient.query(`UPDATE patient_statuses SET is_active = false WHERE id = $1 AND tenant_id = $2`, [id, tenantId]);
      return res.status(200).json({ message: 'Status deactivated as it is referenced by existing patients' });
    } else {
      await req.dbClient.query(`DELETE FROM patient_statuses WHERE id = $1 AND tenant_id = $2`, [id, tenantId]);
      return res.status(200).json({ message: 'Status deleted successfully' });
    }
  } catch (err) {
    console.error('Delete patient status error:', err.message);
    return res.status(500).json({ error: 'Failed to delete patient status' });
  }
};

module.exports = {
  getStatuses,
  createStatus,
  updateStatus,
  deleteStatus
};
