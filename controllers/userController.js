const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. Get Users for the current tenant (or all for SaaS Super Admin)
const getUsers = async (req, res) => {
  const isSaasSuperAdmin = req.user.role === 'SUPER_ADMIN_SAAS' || req.user.email === 'mbndiaye@gmail.com';
  const tenantId = req.user.tenant_id;
  const targetTenantId = req.query.tenant_id;

  try {
    let query;
    let params;

    if (isSaasSuperAdmin) {
      if (targetTenantId && targetTenantId !== 'all') {
        query = `
          SELECT u.id, u.tenant_id, t.name as tenant_name, t.slug as tenant_slug,
                 u.email, u.first_name, u.last_name, u.role, u.preset_name,
                 u.permissions, u.is_active, u.created_at
          FROM users u
          LEFT JOIN tenants t ON u.tenant_id = t.id
          WHERE u.tenant_id = $1
          ORDER BY u.created_at DESC
        `;
        params = [targetTenantId];
      } else {
        query = `
          SELECT u.id, u.tenant_id, t.name as tenant_name, t.slug as tenant_slug,
                 u.email, u.first_name, u.last_name, u.role, u.preset_name,
                 u.permissions, u.is_active, u.created_at
          FROM users u
          LEFT JOIN tenants t ON u.tenant_id = t.id
          ORDER BY (u.role = 'SUPER_ADMIN_SAAS') DESC, t.name ASC, u.created_at DESC
        `;
        params = [];
      }
    } else {
      query = `
        SELECT u.id, u.tenant_id, t.name as tenant_name, t.slug as tenant_slug,
               u.email, u.first_name, u.last_name, u.role, u.preset_name,
               u.permissions, u.is_active, u.created_at
        FROM users u
        LEFT JOIN tenants t ON u.tenant_id = t.id
        WHERE u.tenant_id = $1
        ORDER BY u.created_at DESC
      `;
      params = [tenantId];
    }

    const result = await pool.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('getUsers error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// 2. Create a new user (Supports 3 tiers: Super Admin SaaS, Tenant Admin, Tenant User)
const createUser = async (req, res) => {
  const isSaasSuperAdmin = req.user.role === 'SUPER_ADMIN_SAAS' || req.user.email === 'mbndiaye@gmail.com';
  const { email, password, first_name, last_name, role, preset_name, permissions } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'Email, mot de passe, prénom et nom sont requis' });
  }

  // Only SUPER_ADMIN_SAAS or TENANT_ADMIN can create users
  if (!isSaasSuperAdmin && !['SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Accès refusé : seuls les administrateurs peuvent créer des utilisateurs' });
  }

  // Determine target tenant ID:
  // - For Super Admin creating a Super Admin: defaults to current tenant or system tenant
  // - For Super Admin creating tenant admin/user: uses body.tenant_id if specified, else current tenant
  // - For Tenant Admin: strictly restricted to their own tenant
  let targetTenantId = req.user.tenant_id;
  let userRole = role || 'TENANT_USER';

  if (isSaasSuperAdmin) {
    if (userRole === 'SUPER_ADMIN_SAAS') {
      targetTenantId = req.body.tenant_id || req.user.tenant_id;
    } else if (req.body.tenant_id) {
      targetTenantId = req.body.tenant_id;
    }
  } else {
    // Prevent tenant admins from creating super admins or targeting other tenants
    if (userRole === 'SUPER_ADMIN_SAAS') {
      userRole = 'TENANT_ADMIN';
    }
    targetTenantId = req.user.tenant_id;
  }

  try {
    // Check if email already exists in this tenant (or globally for superadmin)
    const existing = await pool.query(
      `SELECT id FROM users WHERE tenant_id = $1 AND email = $2`,
      [targetTenantId, email.toLowerCase().trim()]
    );

    if (existing.rowCount > 0) {
      return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà dans cette clinique' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    let userPreset = preset_name;
    if (!userPreset) {
      if (userRole === 'SUPER_ADMIN_SAAS') userPreset = 'SUPER_ADMIN_SAAS';
      else if (userRole === 'TENANT_ADMIN' || userRole === 'ADMIN') userPreset = 'ADMIN';
      else if (userRole === 'READONLY') userPreset = 'READONLY';
      else userPreset = 'DOCTOR';
    }

    const userPerms = permissions || {};

    const insertRes = await pool.query(`
      INSERT INTO users (tenant_id, email, password_hash, first_name, last_name, role, preset_name, permissions, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
      RETURNING id, tenant_id, email, first_name, last_name, role, preset_name, permissions, is_active, created_at
    `, [targetTenantId, email.toLowerCase().trim(), password_hash, first_name.trim(), last_name.trim(), userRole, userPreset, JSON.stringify(userPerms)]);

    return res.status(201).json(insertRes.rows[0]);
  } catch (err) {
    console.error('createUser error:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur: ' + err.message });
  }
};

// 3. Update an existing user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;
  const isSaasSuperAdmin = req.user.role === 'SUPER_ADMIN_SAAS';
  const { email, password, first_name, last_name, role, preset_name, permissions, is_active } = req.body;

  // Only Admin can update users
  if (!['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Accès refusé : droits administrateur requis' });
  }

  try {
    // Check if target user belongs to tenant (unless super admin)
    const checkQuery = isSaasSuperAdmin 
      ? `SELECT id, password_hash FROM users WHERE id = $1`
      : `SELECT id, password_hash FROM users WHERE id = $1 AND tenant_id = $2`;
    const checkParams = isSaasSuperAdmin ? [id] : [id, tenantId];

    const targetUser = await pool.query(checkQuery, checkParams);
    if (targetUser.rowCount === 0) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    let password_hash = targetUser.rows[0].password_hash;
    if (password && password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      password_hash = await bcrypt.hash(password, salt);
    }

    const updateQuery = `
      UPDATE users 
      SET email = COALESCE($1, email),
          password_hash = $2,
          first_name = COALESCE($3, first_name),
          last_name = COALESCE($4, last_name),
          role = COALESCE($5, role),
          preset_name = COALESCE($6, preset_name),
          permissions = COALESCE($7, permissions),
          is_active = COALESCE($8, is_active)
      WHERE id = $9
      RETURNING id, tenant_id, email, first_name, last_name, role, preset_name, permissions, is_active, created_at
    `;

    const updateParams = [
      email ? email.toLowerCase().trim() : null,
      password_hash,
      first_name || null,
      last_name || null,
      role || null,
      preset_name || null,
      permissions ? JSON.stringify(permissions) : null,
      typeof is_active === 'boolean' ? is_active : null,
      id
    ];

    const result = await pool.query(updateQuery, updateParams);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('updateUser error:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

// 4. Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tenantId = req.user.tenant_id;
  const isSaasSuperAdmin = req.user.role === 'SUPER_ADMIN_SAAS';

  if (!['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  // Prevent self-deletion
  if (req.user.id === id) {
    return res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte administrateur' });
  }

  try {
    const deleteQuery = isSaasSuperAdmin
      ? `DELETE FROM users WHERE id = $1 RETURNING id`
      : `DELETE FROM users WHERE id = $1 AND tenant_id = $2 RETURNING id`;
    const deleteParams = isSaasSuperAdmin ? [id] : [id, tenantId];

    const result = await pool.query(deleteQuery, deleteParams);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error('deleteUser error:', err.message);
    return res.status(500).json({ error: 'Impossible de supprimer cet utilisateur (enregistrements associés)' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
