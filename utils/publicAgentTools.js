/**
 * Outils de l'agent IA du PORTAIL PUBLIC (patients non authentifiés).
 *
 * Deux différences volontaires avec les outils côté clinique (utils/aiAgentTools.js) :
 *
 * 1. AUCUN OUTIL N'ÉCRIT EN BASE. L'agent conversationnel prépare une réservation ;
 *    c'est l'endpoint public existant POST /api/public/book qui l'enregistre
 *    réellement, après confirmation explicite du patient. Toutes les règles métier
 *    (acompte de 2 000 FCFA pour un nouveau patient, recoupement code + nom,
 *    génération du code SM-XXXX, anti-doublon sur le téléphone) restent donc au
 *    même endroit, sur le chemin déjà éprouvé — impossible qu'elles divergent.
 *
 * 2. LA VÉRIFICATION D'IDENTITÉ REPREND LES RÈGLES PUBLIQUES, pas celles de la
 *    clinique. `verifier_code_patient` exige le code ET le nom, et ne renvoie
 *    jamais le téléphone ni la date de naissance — contrairement à l'outil
 *    interne. Sans cela, un code patient à 4 chiffres (9 000 possibilités)
 *    deviendrait énumérable par un agent public : on obtiendrait l'annuaire des
 *    patients de la clinique. Le portail actuel protège déjà contre ça, l'agent
 *    ne doit pas affaiblir cette protection.
 *
 * Le tenant n'est JAMAIS choisi par le modèle : il est résolu depuis le slug de
 * l'URL du portail, côté serveur.
 */

const { searchAvailableSlots } = require('./aiAgentTools');

const PUBLIC_AGENT_TOOLS = [
  {
    name: 'chercher_creneaux_disponibles',
    description: "Cherche les créneaux de rendez-vous libres à une date donnée (la clinique consulte de 08h00 à 18h00). À utiliser avant de proposer un horaire — ne propose jamais un horaire sans l'avoir vérifié.",
    parameters: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Date souhaitée au format AAAA-MM-JJ' },
        practitioner_id: { type: 'string', description: "Identifiant du praticien si le patient en a demandé un précis. Sinon laisser vide." }
      },
      required: ['date']
    }
  },
  {
    name: 'verifier_code_patient',
    description: "Vérifie qu'un code patient (ex: SM-4821) correspond bien à la personne. Le prénom OU le nom est obligatoire en plus du code : c'est une vérification d'identité, pas une recherche. À utiliser quand le patient dit avoir déjà un dossier dans cette clinique.",
    parameters: {
      type: 'object',
      properties: {
        patient_code: { type: 'string', description: 'Code patient, ex: SM-4821' },
        first_name: { type: 'string', description: 'Prénom annoncé par le patient' },
        last_name: { type: 'string', description: 'Nom annoncé par le patient' }
      },
      required: ['patient_code']
    }
  },
  {
    name: 'preparer_reservation',
    description: "Prépare la réservation une fois TOUS les éléments réunis et confirmés avec le patient : la date et l'heure exactes (issues des créneaux libres), et soit un code patient vérifié, soit les informations d'un nouveau patient (prénom, nom, téléphone). Cet outil n'enregistre rien : il prépare un récapitulatif que le patient devra confirmer d'un clic. Après l'avoir appelé, annonce le récapitulatif et invite le patient à confirmer.",
    parameters: {
      type: 'object',
      properties: {
        start_time: { type: 'string', description: 'Date et heure de début au format ISO 8601, ex: 2026-09-02T10:00:00.000Z' },
        practitioner_id: { type: 'string', description: 'Identifiant du praticien retenu' },
        patient_code: { type: 'string', description: "Code du patient existant, s'il a été vérifié avec succès" },
        first_name: { type: 'string', description: 'Prénom du patient' },
        last_name: { type: 'string', description: 'Nom du patient' },
        phone_number: { type: 'string', description: 'Téléphone — obligatoire pour un nouveau patient' },
        is_new_patient: { type: 'boolean', description: "true si le patient n'a pas de code patient dans cette clinique" },
        consultation_reason: { type: 'string', description: 'Motif de consultation, si le patient en a donné un' }
      },
      required: ['start_time']
    }
  }
];

// Retire les accents pour comparer les noms (Aïssatou == aissatou), comme le fait
// déjà publicVerifyPatient — plage des diacritiques combinants Unicode.
const cleanStr = (s) => (s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * Vérification d'identité reprenant exactement les règles de publicVerifyPatient :
 * le code seul ne révèle rien d'autre que son existence, et il faut le nom pour
 * confirmer. Ne renvoie ni téléphone ni date de naissance.
 */
async function verifyPatientCodePublic(dbClient, tenantId, { patient_code, first_name, last_name }) {
  if (!patient_code) throw new Error('Le code patient est requis.');

  const r = await dbClient.query(
    `SELECT id, patient_code, first_name, last_name
     FROM patients WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2)) LIMIT 1`,
    [tenantId, patient_code]
  );

  if (r.rowCount === 0) {
    return { exists: false, verified: false, message: `Aucun dossier ne correspond au code ${patient_code} dans cette clinique. Le patient peut s'enregistrer comme nouveau patient.` };
  }

  if (!first_name && !last_name) {
    return {
      exists: true,
      verified: false,
      requires_name: true,
      message: "Ce code existe. Demande maintenant au patient son prénom et son nom pour confirmer son identité — ne révèle aucune information tant que l'identité n'est pas confirmée."
    };
  }

  const p = r.rows[0];
  const matchFirst = !first_name || cleanStr(p.first_name).includes(cleanStr(first_name)) || cleanStr(first_name).includes(cleanStr(p.first_name));
  const matchLast = !last_name || cleanStr(p.last_name).includes(cleanStr(last_name)) || cleanStr(last_name).includes(cleanStr(p.last_name));

  if (!matchFirst || !matchLast) {
    return { exists: true, verified: false, identity_mismatch: true, message: "Le prénom ou le nom ne correspond pas à ce code patient. N'affiche aucune information et propose de réessayer ou de s'enregistrer comme nouveau patient." };
  }

  return {
    exists: true,
    verified: true,
    patient_code: p.patient_code,
    first_name: p.first_name,
    last_name: p.last_name,
    message: `Identité confirmée : ${p.first_name} ${p.last_name}.`
  };
}

/**
 * Ne réserve rien : valide la complétude et renvoie le récapitulatif que
 * l'interface soumettra à POST /api/public/book après confirmation du patient.
 */
async function prepareBooking(dbClient, tenantId, args) {
  const { start_time, practitioner_id, patient_code, first_name, last_name, phone_number, is_new_patient, consultation_reason } = args;

  if (!start_time) throw new Error('La date et l\'heure du rendez-vous sont requises.');
  const start = new Date(start_time);
  if (Number.isNaN(start.getTime())) throw new Error('Date et heure invalides, attendu un horodatage ISO 8601.');
  if (start.getTime() < Date.now()) throw new Error('Ce créneau est déjà passé. Propose une date future.');

  const isNew = is_new_patient === true || !patient_code;

  if (isNew) {
    if (!first_name || !last_name || !phone_number) {
      return {
        ready: false,
        missing: ['prénom', 'nom', 'téléphone'].filter((_, i) => ![first_name, last_name, phone_number][i]),
        message: "Il manque des informations pour un nouveau patient : prénom, nom et téléphone sont obligatoires. Demande-les au patient."
      };
    }
  } else {
    // Le code doit avoir été vérifié auparavant : on revalide côté serveur pour
    // que le modèle ne puisse pas court-circuiter la vérification d'identité.
    const check = await verifyPatientCodePublic(dbClient, tenantId, { patient_code, first_name, last_name });
    if (!check.verified) {
      return { ready: false, message: "Le code patient n'a pas été confirmé avec le nom. Vérifie l'identité avant de préparer la réservation." };
    }
  }

  return {
    ready: true,
    // Paramètres destinés à POST /api/public/book — l'interface les soumet telles quelles
    booking_params: {
      start_time: start.toISOString(),
      practitioner_id: practitioner_id || null,
      patient_code: isNew ? null : patient_code,
      first_name: first_name || null,
      last_name: last_name || null,
      phone_number: phone_number || null,
      is_new_patient: isNew,
      consultation_reason: consultation_reason || null,
      booking_channel: 'VOICE_AGENT'
    },
    deposit_required: isNew ? 2000 : 0,
    message: isNew
      ? "Récapitulatif prêt. Annonce au patient la date, l'heure, et qu'un acompte de 2 000 FCFA est demandé pour une première consultation, puis invite-le à confirmer."
      : "Récapitulatif prêt. Annonce au patient la date et l'heure, puis invite-le à confirmer."
  };
}

const PUBLIC_TOOL_IMPLS = {
  chercher_creneaux_disponibles: searchAvailableSlots,
  verifier_code_patient: verifyPatientCodePublic,
  preparer_reservation: prepareBooking
};

async function executePublicTool(name, args, { dbClient, tenantId }) {
  const impl = PUBLIC_TOOL_IMPLS[name];
  if (!impl) throw new Error(`Outil inconnu : ${name}`);
  const safeArgs = args && typeof args === 'object' ? args : {};

  // Même filet que côté clinique : une erreur SQL sur un argument mal formé par le
  // modèle ne doit pas avorter la transaction pour le reste de la conversation.
  await dbClient.query('SAVEPOINT public_agent_tool');
  try {
    const result = await impl(dbClient, tenantId, safeArgs);
    await dbClient.query('RELEASE SAVEPOINT public_agent_tool');
    return result;
  } catch (err) {
    await dbClient.query('ROLLBACK TO SAVEPOINT public_agent_tool');
    throw err;
  }
}

module.exports = {
  PUBLIC_AGENT_TOOLS,
  executePublicTool
};
