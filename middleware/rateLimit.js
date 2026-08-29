/**
 * Limitation de débit en mémoire, pour les endpoints publics coûteux.
 *
 * L'agent du portail public appelle le LLM du tenant avec SA clé API à chaque
 * message. Sans limite, n'importe qui peut marteler l'endpoint et faire grimper
 * la facture d'API de la clinique — le coût est supporté par elle, pas par
 * l'appelant. C'est le risque le plus immédiat d'un endpoint LLM non authentifié.
 *
 * Volontairement sans dépendance et sans stockage externe : le compteur vit dans
 * le processus. Sur un déploiement multi-instances, chaque instance a son propre
 * compteur — la limite effective est donc multipliée par le nombre d'instances.
 * Suffisant contre un abus opportuniste, à remplacer par un compteur partagé
 * (Redis) si le service passe à plusieurs instances.
 */

const buckets = new Map();

// Purge périodique pour que la Map ne grossisse pas indéfiniment avec les IP vues une fois
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (now - entry.start > entry.windowMs * 2) buckets.delete(key);
  }
}, CLEANUP_INTERVAL_MS);
// Ne pas maintenir le processus en vie uniquement pour ce nettoyage
if (cleanupTimer.unref) cleanupTimer.unref();

/**
 * @param {object} options
 * @param {number} options.windowMs fenêtre glissante, en millisecondes
 * @param {number} options.max nombre de requêtes autorisées par fenêtre et par IP
 * @param {string} options.message message renvoyé en cas de dépassement
 */
function rateLimit({ windowMs = 60000, max = 15, message = 'Trop de requêtes. Merci de patienter un instant.' } = {}) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.socket?.remoteAddress || 'inconnu';
    const key = `${req.path}:${ip}`;
    const now = Date.now();

    let entry = buckets.get(key);
    if (!entry || now - entry.start > windowMs) {
      entry = { start: now, count: 0, windowMs };
      buckets.set(key, entry);
    }

    entry.count += 1;

    if (entry.count > max) {
      const retryAfterSec = Math.ceil((entry.start + windowMs - now) / 1000);
      res.set('Retry-After', String(Math.max(retryAfterSec, 1)));
      return res.status(429).json({ error: message, retry_after_seconds: Math.max(retryAfterSec, 1) });
    }

    next();
  };
}

module.exports = { rateLimit };
