const logAudit = async (req, action, resourceType, resourceId) => {
  if (!req.dbClient || !req.user) {
    // If we're not inside a tenant-isolated client transaction, we cannot write audit logs
    return;
  }

  const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'unknown';

  // Savepoint : l'écriture du journal d'audit ne doit jamais avorter la transaction métier
  try {
    await req.dbClient.query('SAVEPOINT audit_log');
  } catch (err) {
    console.error('Cannot open savepoint for audit log:', err.message);
    return;
  }

  try {
    await req.dbClient.query(
      `INSERT INTO medical_audit_logs (tenant_id, user_id, action, resource_type, resource_id, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        req.user.tenant_id,
        req.user.id,
        action,
        resourceType,
        resourceId,
        ipAddress,
        userAgent
      ]
    );
    await req.dbClient.query('RELEASE SAVEPOINT audit_log');
  } catch (err) {
    console.error('Audit logging failed:', err.message);
    // We don't throw to avoid failing primary business operations
    try {
      await req.dbClient.query('ROLLBACK TO SAVEPOINT audit_log');
    } catch (e) {
      console.error('Audit savepoint rollback failed:', e.message);
    }
  }
};

module.exports = {
  logAudit
};
