const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';

// Verify JWT Token and attach user details to request
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, tenant_id, role, email
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Check if user is an Administrator (SUPER_ADMIN)
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Require Administrator role' });
  }
  next();
};

// Restrict simple users to read-only (GET) requests
// If user is SUPER_ADMIN, they have full access.
// If user is not SUPER_ADMIN (e.g., a simple reader or staff member), they can only use GET requests.
const checkWriteAccess = (req, res, next) => {
  if (req.method !== 'GET' && (!req.user || req.user.role !== 'SUPER_ADMIN')) {
    // Specific clinical/financial operations can be performed by designated roles
    const path = req.path;
    const role = req.user.role;

    if (path.startsWith('/clinical') && role === 'DOCTOR') {
      return next(); // Doctors can write clinical notes/prescriptions
    }
    if (path.startsWith('/billing/payments') && role === 'CASHIER') {
      return next(); // Cashiers can record payments
    }
    if (path.startsWith('/inventory') && role === 'PHARMACIST') {
      return next(); // Pharmacists can update stock
    }

    return res.status(403).json({ error: 'Forbidden: Simple users are restricted to read-only consultation' });
  }
  next();
};

module.exports = {
  verifyToken,
  requireAdmin,
  checkWriteAccess
};
