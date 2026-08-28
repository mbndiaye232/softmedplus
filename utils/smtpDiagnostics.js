const dns = require('dns').promises;

// Domaines de messagerie grand public : Gmail, Yahoo, etc. n'autorisent jamais un
// serveur tiers à envoyer en leur nom. Un client qui saisit une telle adresse comme
// expéditeur ne pourra JAMAIS faire fonctionner son envoi, quel que soit le SMTP.
const PUBLIC_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.fr', 'yahoo.co.uk',
  'hotmail.com', 'hotmail.fr', 'outlook.com', 'outlook.fr', 'live.com', 'live.fr', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com',
  'gmx.com', 'gmx.fr', 'gmx.net',
  'yandex.com', 'yandex.ru',
  'protonmail.com', 'proton.me',
  'mail.com', 'zoho.com'
]);

// Sélecteurs DKIM les plus courants chez les fournisseurs usuels (OVH, Google,
// Microsoft, Brevo, Mailchimp...). La détection reste indicative : un sélecteur
// absent de cette liste ne signifie pas qu'aucun DKIM n'est publié.
const COMMON_DKIM_SELECTORS = [
  'default', 'selector1', 'selector2', 'dkim', 'mail',
  'google', 'k1', 's1', 's2',
  'brevo1', 'brevo2', 'mailo',
  'ovhmo1e1', 'ovhmo2e1', 'ovhmo3e1', 'ovhmo4e1', 'ovhmo5e1'
];

const getDomain = (email) => (email || '').split('@')[1]?.toLowerCase().trim() || '';

// Heuristique : ramène un hôte SMTP au nom du fournisseur probable, en ne gardant
// que le libellé de second niveau (ssl0.ovh.net -> "ovh", smtp-relay.brevo.com ->
// "brevo", smtp.office365.com -> "office365"). Comparer le seul libellé plutôt que
// domaine+TLD évite les faux avertissements quand le SPF référence une autre
// extension du même fournisseur (ex: OVH publie "mx.ovh.com" alors que son SMTP
// est sur "ovh.net" — les deux sont légitimes).
const orgLabelOf = (host) => {
  const parts = (host || '').toLowerCase().split('.').filter(Boolean);
  return parts.length >= 2 ? parts[parts.length - 2] : (host || '').toLowerCase();
};

async function domainResolves(domain) {
  try {
    const mx = await dns.resolveMx(domain);
    if (mx && mx.length > 0) return { resolves: true, via: 'MX' };
  } catch (e) {}
  try {
    await dns.resolve4(domain);
    return { resolves: true, via: 'A' };
  } catch (e) {}
  try {
    await dns.resolve6(domain);
    return { resolves: true, via: 'AAAA' };
  } catch (e) {}
  return { resolves: false, via: null };
}

async function getSpfRecord(domain) {
  try {
    const records = await dns.resolveTxt(domain);
    const flat = records.map((r) => r.join(''));
    return flat.find((r) => /^v=spf1/i.test(r)) || null;
  } catch (e) {
    return null;
  }
}

async function findDkimSelector(domain) {
  for (const selector of COMMON_DKIM_SELECTORS) {
    try {
      const records = await dns.resolveTxt(`${selector}._domainkey.${domain}`);
      if (records && records.length > 0) return selector;
    } catch (e) {
      // sélecteur absent : normal, on continue
    }
  }
  return null;
}

/**
 * Diagnostic best-effort d'un compte SMTP avant tout envoi réel : vérifie que le
 * domaine d'expédition peut plausiblement délivrer chez les grands fournisseurs
 * (Gmail, Outlook...), sans attendre qu'un client découvre le problème deux jours
 * plus tard sur un email jamais reçu.
 *
 * @param {string} fromEmail adresse d'expédition (ex: facturation@clinique.sn)
 * @param {string} smtpHost hôte SMTP configuré (ex: smtp-relay.brevo.com)
 * @returns {Promise<{checks: Array, overall: 'ok'|'warning'|'blocker'}>}
 */
async function runSmtpDiagnostics({ fromEmail, smtpHost }) {
  const domain = getDomain(fromEmail);
  const checks = [];

  if (!domain) {
    return {
      overall: 'blocker',
      checks: [{
        id: 'from_email_valid',
        label: "Adresse d'expédition",
        status: 'blocker',
        message: "Adresse d'expédition invalide ou incomplète."
      }]
    };
  }

  // 1. Adresse grand public : blocage immédiat, inutile de tester le reste
  if (PUBLIC_EMAIL_DOMAINS.has(domain)) {
    checks.push({
      id: 'public_provider',
      label: 'Domaine grand public',
      status: 'blocker',
      message: `${domain} est une messagerie grand public (Gmail, Yahoo...). Ces fournisseurs interdisent l'envoi en leur nom depuis un serveur tiers : utilisez une adresse sur votre propre nom de domaine.`
    });
    return { overall: 'blocker', checks };
  }
  checks.push({
    id: 'public_provider',
    label: 'Domaine grand public',
    status: 'ok',
    message: `${domain} n'est pas une messagerie grand public.`
  });

  // 2. Le domaine existe-t-il dans le DNS public
  const dnsCheck = await domainResolves(domain);
  checks.push({
    id: 'domain_resolves',
    label: 'Domaine résolvable',
    status: dnsCheck.resolves ? 'ok' : 'blocker',
    message: dnsCheck.resolves
      ? `${domain} résout correctement (enregistrement ${dnsCheck.via}).`
      : `${domain} n'existe pas dans le DNS public (aucun MX, ni A, ni AAAA). Le domaine est probablement expiré ou sa zone DNS n'est pas activée : aucun email ne pourra jamais être délivré tant que ce n'est pas corrigé.`
  });
  if (!dnsCheck.resolves) {
    return { overall: 'blocker', checks };
  }

  // 3. SPF : le domaine autorise-t-il l'hôte SMTP à envoyer en son nom
  const spf = await getSpfRecord(domain);
  if (!spf) {
    checks.push({
      id: 'spf',
      label: 'SPF',
      status: 'warning',
      message: `Aucun enregistrement SPF publié pour ${domain}. Sans SPF ni DKIM, Gmail et Outlook rejettent ou classent en spam la plupart des messages.`
    });
  } else {
    const providerLabel = orgLabelOf(smtpHost);
    const authorizes = providerLabel && spf.toLowerCase().includes(providerLabel);
    checks.push({
      id: 'spf',
      label: 'SPF',
      status: authorizes ? 'ok' : 'warning',
      message: authorizes
        ? `SPF publié et semble autoriser ${smtpHost} (le fournisseur « ${providerLabel} » apparaît dans l'enregistrement).`
        : `SPF publié (${spf}), mais aucune mention de « ${providerLabel || smtpHost} » n'y apparaît. Vérifiez qu'il autorise bien votre serveur d'envoi.`
    });
  }

  // 4. DKIM : best-effort, jamais un blocage — beaucoup de sélecteurs valides sont
  // introuvables sans connaître le nom exact choisi par le fournisseur.
  const dkimSelector = await findDkimSelector(domain);
  checks.push({
    id: 'dkim',
    label: 'DKIM',
    status: dkimSelector ? 'ok' : 'info',
    message: dkimSelector
      ? `Un enregistrement DKIM a été détecté (sélecteur « ${dkimSelector} »).`
      : `Aucun DKIM détecté parmi les sélecteurs courants. Cela ne veut pas dire qu'il n'y en a pas — certains fournisseurs utilisent des noms de sélecteur non standards.`
  });

  const hasBlocker = checks.some((c) => c.status === 'blocker');
  const hasWarning = checks.some((c) => c.status === 'warning');
  const overall = hasBlocker ? 'blocker' : (hasWarning ? 'warning' : 'ok');

  return { overall, checks };
}

module.exports = {
  runSmtpDiagnostics,
  PUBLIC_EMAIL_DOMAINS
};
