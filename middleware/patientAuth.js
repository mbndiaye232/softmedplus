const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clinicos-jwt-super-secret-key-2026';

// Jeton dedie au portail patient : distinct du jeton staff (verifyToken/middleware/auth.js)
// par le claim `scope`. Un jeton staff, meme valide, est rejete ici, et inversement -
// evite qu'un jeton d'un type se fasse passer pour l'autre si jamais reutilise au
// mauvais endroit. tenant_id et patient_id ne viennent QUE de ce jeton signe cote
// serveur, jamais d'un parametre client (meme legon que le correctif d'isolation
// multi-tenant : ne jamais faire confiance a une donnee fournie par l'appelant pour
// scoper l'acces aux donnees d'un autre patient/tenant).
const verifyPatientToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Session expirée, veuillez vous reconnecter' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.scope !== 'patient_portal') {
      return res.status(403).json({ error: 'Jeton invalide pour cet espace' });
    }
    req.patientAuth = {
      patientId: decoded.patient_id,
      tenantId: decoded.tenant_id,
      patientCode: decoded.patient_code
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expirée, veuillez vous reconnecter' });
  }
};

module.exports = { verifyPatientToken };
