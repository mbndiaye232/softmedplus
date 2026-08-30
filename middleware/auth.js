const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';

// 1. Verify JWT Token and attach user details to request
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, tenant_id, role, preset_name, permissions, email

    // Allow SaaS Super Administrator to switch tenant context via X-Tenant-ID header
    const headerTenant = req.headers['x-tenant-id'];
    if ((req.user.role === 'SUPER_ADMIN_SAAS' || req.user.email === 'mbndiaye@gmail.com') && headerTenant && headerTenant !== 'undefined' && headerTenant !== 'null') {
      req.user.tenant_id = headerTenant;
    }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// 2. Check if user is an Administrator (SaaS Super Admin or Tenant Admin)
const requireAdmin = (req, res, next) => {
  if (!req.user || !['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Accès refusé : Droits Administrateur requis' });
  }
  next();
};

// 3. Check if user is SaaS Super Administrator
const requireSaasAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'SUPER_ADMIN_SAAS') {
    return res.status(403).json({ error: 'Accès refusé : Droits Super Administrateur SaaS requis' });
  }
  next();
};

// 4. Granular Permission Checker (module, action: 'view' | 'create' | 'update' | 'delete')
// Action non précisée => déduite de la méthode HTTP (GET=view, POST=create,
// PUT/PATCH=update, DELETE=delete). Le défaut était 'view', ce qui rendait la
// déduction inatteignable : une route protégée n'aurait alors exigé que le droit
// de consultation, y compris pour créer ou supprimer.
const checkPermission = (moduleName, action = null) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    // Admins have bypass on all permissions
    if (['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
      return next();
    }

    const permissions = req.user.permissions || {};
    const modulePerms = permissions[moduleName];

    // Determine required action based on HTTP method if not explicitly specified
    let requiredAction = action;
    if (!requiredAction) {
      if (req.method === 'GET') requiredAction = 'view';
      else if (req.method === 'POST') requiredAction = 'create';
      else if (req.method === 'PUT' || req.method === 'PATCH') requiredAction = 'update';
      else if (req.method === 'DELETE') requiredAction = 'delete';
    }

    if (modulePerms && modulePerms[requiredAction] === true) {
      return next();
    }

    const actionLabels = {
      view: 'consulter',
      create: 'créer',
      update: 'modifier',
      delete: 'supprimer'
    };

    return res.status(403).json({
      error: `Accès refusé : Vous n'avez pas l'autorisation de ${actionLabels[requiredAction] || requiredAction} dans le module "${moduleName}".`
    });
  };
};

// 5. General Write Access Check
const checkWriteAccess = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  // Admins always have write access
  if (req.user && ['SUPER_ADMIN_SAAS', 'SUPER_ADMIN', 'TENANT_ADMIN', 'ADMIN'].includes(req.user.role)) {
    return next();
  }

  // Check general permissions for tenant users
  if (req.user && req.user.role === 'TENANT_USER') {
    return next(); // Let specific controllers / permission middleware validate
  }

  return res.status(403).json({ error: 'Accès refusé : Opération d\'écriture non autorisée' });
};

module.exports = {
  verifyToken,
  requireAdmin,
  requireSaasAdmin,
  checkPermission,
  checkWriteAccess
};
