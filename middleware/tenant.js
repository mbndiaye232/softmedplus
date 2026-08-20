const pool = require('../config/db');

// Multi-tenant Row Level Security middleware
const tenantIsolator = async (req, res, next) => {
  // Public paths that do not require RLS context (e.g., public auth endpoints)
  const publicPaths = ['/auth/login', '/auth/register-tenant'];
  if (publicPaths.some(path => req.path.includes(path))) {
    return next();
  }

  // Extract tenant ID from authenticated user (set by auth middleware)
  // or fall back to 'x-tenant-id' header
  let tenantId = req.user ? req.user.tenant_id : null;
  if (!tenantId) {
    tenantId = req.headers['x-tenant-id'];
  }

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant context (X-Tenant-ID or Auth token) is required' });
  }

  try {
    // Check out a client from the pool for transaction execution
    const client = await pool.connect();
    req.dbClient = client;

    // Begin transaction and inject the current_tenant_id session config
    await client.query('BEGIN');
    await client.query(`SET LOCAL app.current_tenant_id = $1`, [tenantId]);

    // Track transaction status
    let isFinished = false;

    const commitAndRelease = async (shouldCommit = true) => {
      if (isFinished) return;
      isFinished = true;

      if (req.dbClient) {
        try {
          if (shouldCommit) {
            await req.dbClient.query('COMMIT');
          } else {
            await req.dbClient.query('ROLLBACK');
          }
        } catch (e) {
          console.error('Error closing RLS transaction:', e.message);
        } finally {
          req.dbClient.release();
          req.dbClient = null;
        }
      }
    };

    // Intercept standard Express send methods to automatically close the transaction
    const originalJson = res.json;
    res.json = function (data) {
      const statusCode = res.statusCode;
      const shouldCommit = statusCode >= 200 && statusCode < 400;
      
      commitAndRelease(shouldCommit).then(() => {
        originalJson.call(this, data);
      });
    };

    const originalSend = res.send;
    res.send = function (data) {
      const statusCode = res.statusCode;
      const shouldCommit = statusCode >= 200 && statusCode < 400;

      commitAndRelease(shouldCommit).then(() => {
        originalSend.call(this, data);
      });
    };

    // If request finishes, falls out, or gets closed abruptly, perform cleanup
    res.on('finish', () => commitAndRelease(true));
    res.on('close', () => commitAndRelease(false));

    next();
  } catch (err) {
    console.error('RLS context initialization error:', err.message);
    if (req.dbClient) {
      try {
        await req.dbClient.query('ROLLBACK');
      } catch (e) {}
      req.dbClient.release();
      req.dbClient = null;
    }
    return res.status(500).json({ error: 'Failed to initialize tenant isolation context' });
  }
};

module.exports = {
  tenantIsolator
};
