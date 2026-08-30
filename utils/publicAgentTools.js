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
    name: 'lister_praticiens_et_prestations',
    description: "Liste les praticiens de la clinique avec leur spécialité, et les prestations proposées avec leur tarif et leur durée. À utiliser AVANT de chercher des créneaux, pour orienter le patient vers le bon spécialiste selon le motif de sa consultation. Ne devine jamais quel praticien correspond à un motif : appelle cet outil.",
    parameters: { type: 'object', properties: {} }
  },
  {
    name: 'chercher_creneaux_disponibles',
    description: "Cherche les créneaux de rendez-vous libres à une date donnée (la clinique consulte de 08h00 à 18h00). À utiliser avant de proposer un horaire — ne propose jamais un horaire sans l'avoir vérifié.",
    parameters: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Date souhaitée au format AAAA-MM-JJ' },
        practitioner_id: { type: 'string', description: "Identifiant du praticien retenu pour le motif de consultation, obtenu via lister_praticiens_et_prestations. Sans cet identifiant, le premier praticien de la clinique est utilisé par défaut, quelle que soit sa spécialité." },
        medical_service_id: { type: 'string', description: 'Identifiant de la prestation retenue — détermine la durée du créneau.' }
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
        practitioner_id: { type: 'string', description: "Identifiant du praticien retenu, cohérent avec le motif de consultation" },
        medical_service_id: { type: 'string', description: 'Identifiant de la prestation retenue — détermine le tarif et la durée facturés' },
        patient_code: { type: 'string', description: "Code du patient existant, s'il a été vérifié avec succès" },
        first_name: { type: 'string', description: 'Prénom du patient' },
        last_name: { type: 'string', description: 'Nom du patient' },
        phone_number: { type: 'string', description: 'Téléphone — obligatoire pour un nouveau patient' },
        is_new_patient: { type: 'boolean', description: "true si le patient n'a pas de code patient dans cette clinique" },
        consultation_reason: { type: 'string', description: 'Motif de consultation — obligatoire, il détermine le spécialiste' }
      },
      required: ['start_time', 'consultation_reason']
    }
  },
  {
    name: 'lister_mes_rendez_vous',
    description: "Liste les rendez-vous à venir du patient. Exige son code patient ET son prénom et nom, qui sont revérifiés. À utiliser avant toute annulation ou report.",
    parameters: {
      type: 'object',
      properties: {
        patient_code: { type: 'string', description: 'Code patient, ex: SM-4821' },
        first_name: { type: 'string' },
        last_name: { type: 'string' }
      },
      required: ['patient_code', 'first_name', 'last_name']
    }
  },
  {
    name: 'annuler_mon_rendez_vous',
    description: "Annule un rendez-vous du patient. Exige son code patient et son nom, revérifiés, et le rendez-vous doit lui appartenir. N'appelle cet outil qu'après avoir listé ses rendez-vous et obtenu sa confirmation explicite du rendez-vous à annuler.",
    parameters: {
      type: 'object',
      properties: {
        patient_code: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        appointment_id: { type: 'string', description: 'Identifiant du rendez-vous, issu de lister_mes_rendez_vous' },
        motif: { type: 'string', description: "Motif de l'annulation, si le patient l'indique" }
      },
      required: ['patient_code', 'first_name', 'last_name', 'appointment_id']
    }
  },
  {
    name: 'reporter_mon_rendez_vous',
    description: "Reporte un rendez-vous du patient à un nouvel horaire. Exige son code patient et son nom, revérifiés, et le rendez-vous doit lui appartenir. Vérifie d'abord que le créneau visé est libre, puis obtiens sa confirmation explicite.",
    parameters: {
      type: 'object',
      properties: {
        patient_code: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        appointment_id: { type: 'string', description: 'Identifiant du rendez-vous, issu de lister_mes_rendez_vous' },
        nouveau_debut: { type: 'string', description: 'Nouvelle date et heure, ISO 8601' }
      },
      required: ['patient_code', 'first_name', 'last_name', 'appointment_id', 'nouveau_debut']
    }
  }
];

// Retire les accents pour comparer les noms (Aïssatou == aissatou), comme le fait
// déjà publicVerifyPatient — plage des diacritiques combinants Unicode.
const cleanStr = (s) => (s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * Donne à l'agent la carte des praticiens et des prestations, pour qu'il oriente
 * selon le motif. Sans cet outil, il n'avait aucun moyen de savoir qui fait quoi :
 * la recherche de créneaux retombait sur le premier praticien par ordre
 * alphabétique, ce qui envoyait un motif « Cardiologie » chez une ophtalmologue.
 */
async function listPractitionersAndServices(dbClient, tenantId) {
  const pracs = await dbClient.query(
    `SELECT p.id, p.title, p.first_name, p.last_name, p.specialty_name, p.is_general_practitioner,
            COALESCE(
              json_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '[]'
            ) AS specialites
     FROM practitioners p
     LEFT JOIN practitioner_specialties ps ON p.id = ps.practitioner_id
     LEFT JOIN medical_specialties s ON ps.specialty_id = s.id
     WHERE p.tenant_id = $1 AND p.is_active = true
     GROUP BY p.id
     ORDER BY p.first_name ASC`,
    [tenantId]
  );

  const services = await dbClient.query(
    `SELECT id, name, category, duration_minutes, price
     FROM medical_services WHERE tenant_id = $1 AND is_active = true ORDER BY name ASC`,
    [tenantId]
  );

  return {
    praticiens: pracs.rows.map((p) => ({
      id: p.id,
      nom: `${p.title || 'Dr'} ${p.first_name} ${p.last_name}`.trim(),
      specialite: p.specialty_name || null,
      specialites: p.specialites,
      medecin_generaliste: p.is_general_practitioner === true
    })),
    prestations: services.rows.map((s) => ({
      id: s.id, nom: s.name, categorie: s.category,
      duree_minutes: s.duration_minutes, tarif_fcfa: s.price
    })),
    consigne: "Choisis le praticien dont la spécialité correspond au motif du patient. Si aucune spécialité ne correspond, propose un médecin généraliste, ou dis franchement que la clinique ne propose pas cette spécialité — n'oriente jamais vers un spécialiste sans rapport avec le motif."
  };
}

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
  const { start_time, practitioner_id, medical_service_id, patient_code, first_name, last_name, phone_number, is_new_patient, consultation_reason } = args;

  if (!start_time) throw new Error('La date et l\'heure du rendez-vous sont requises.');
  if (!consultation_reason || !String(consultation_reason).trim()) {
    return { ready: false, message: "Le motif de consultation est obligatoire : il détermine vers quel spécialiste orienter le patient. Demande-le avant de préparer la réservation." };
  }
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
      // Sans prestation explicite, /public/book en choisissait une par heuristique :
      // le tarif annoncé pouvait ne correspondre ni au praticien ni au motif.
      medical_service_id: medical_service_id || null,
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

/**
 * Revérifie l'identité côté serveur et renvoie le patient, ou null.
 *
 * Chaque outil agissant sur un rendez-vous repasse par ici : le modèle ne doit
 * jamais pouvoir court-circuiter la vérification en affirmant simplement dans la
 * conversation que l'identité a été confirmée. Sur un portail public non
 * authentifié, c'est la seule barrière entre un patient et le rendez-vous d'un
 * autre.
 */
async function requireVerifiedPatient(dbClient, tenantId, { patient_code, first_name, last_name }) {
  if (!patient_code || !first_name || !last_name) return null;
  const check = await verifyPatientCodePublic(dbClient, tenantId, { patient_code, first_name, last_name });
  if (!check.verified) return null;
  const r = await dbClient.query(
    `SELECT id, first_name, last_name FROM patients
     WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2)) LIMIT 1`,
    [tenantId, patient_code]
  );
  return r.rowCount > 0 ? r.rows[0] : null;
}

async function listMyAppointments(dbClient, tenantId, args) {
  const patient = await requireVerifiedPatient(dbClient, tenantId, args);
  if (!patient) {
    return { verified: false, message: "Identité non confirmée. Demande le code patient ET le prénom et nom, puis réessaie." };
  }

  const r = await dbClient.query(
    `SELECT a.id, a.status, a.consultation_reason,
            lower(a.time_slot) AS debut, upper(a.time_slot) AS fin,
            pr.first_name AS doc_prenom, pr.last_name AS doc_nom, pr.specialty_name AS doc_specialite
     FROM appointments a
     LEFT JOIN practitioners pr ON a.practitioner_id = pr.id
     WHERE a.tenant_id = $1 AND a.patient_id = $2
       AND a.status NOT IN ('CANCELED', 'COMPLETED', 'NO_SHOW')
       AND upper(a.time_slot) > NOW()
     ORDER BY lower(a.time_slot) ASC
     LIMIT 10`,
    [tenantId, patient.id]
  );

  if (r.rowCount === 0) return { verified: true, rendez_vous: [], message: "Vous n'avez aucun rendez-vous à venir." };
  return {
    verified: true,
    rendez_vous: r.rows.map((a) => ({
      appointment_id: a.id,
      debut: a.debut,
      fin: a.fin,
      motif: a.consultation_reason,
      praticien: `${a.doc_prenom || ''} ${a.doc_nom || ''}`.trim(),
      specialite: a.doc_specialite
    }))
  };
}

/**
 * Vérifie que le rendez-vous visé appartient bien au patient identifié.
 * Sans ce contrôle, un identifiant de rendez-vous deviné ou repris d'une autre
 * conversation permettrait d'agir sur le rendez-vous d'autrui.
 */
async function ownedAppointment(dbClient, tenantId, patientId, appointmentId) {
  const r = await dbClient.query(
    `SELECT id, status, practitioner_id, medical_service_id
     FROM appointments WHERE id = $1 AND tenant_id = $2 AND patient_id = $3`,
    [appointmentId, tenantId, patientId]
  );
  return r.rowCount > 0 ? r.rows[0] : null;
}

async function cancelMyAppointment(dbClient, tenantId, args) {
  const patient = await requireVerifiedPatient(dbClient, tenantId, args);
  if (!patient) {
    return { annule: false, message: "Identité non confirmée. Demande le code patient ET le prénom et nom, puis réessaie." };
  }
  if (!args.appointment_id) return { annule: false, message: 'Précise quel rendez-vous annuler.' };

  const appt = await ownedAppointment(dbClient, tenantId, patient.id, args.appointment_id);
  if (!appt) return { annule: false, message: "Ce rendez-vous n'existe pas ou ne vous appartient pas." };
  if (appt.status === 'COMPLETED') return { annule: false, message: 'Ce rendez-vous est déjà passé et ne peut plus être annulé.' };
  if (appt.status === 'CANCELED') return { annule: true, deja_annule: true, message: 'Ce rendez-vous était déjà annulé.' };

  await dbClient.query(
    `UPDATE appointments
     SET status = 'CANCELED', consultation_reason = COALESCE($1, consultation_reason)
     WHERE id = $2 AND tenant_id = $3`,
    [args.motif ? `Annulé : ${args.motif}` : null, args.appointment_id, tenantId]
  );
  return { annule: true, message: 'Votre rendez-vous a bien été annulé.' };
}

async function rescheduleMyAppointment(dbClient, tenantId, args) {
  const patient = await requireVerifiedPatient(dbClient, tenantId, args);
  if (!patient) {
    return { reporte: false, message: "Identité non confirmée. Demande le code patient ET le prénom et nom, puis réessaie." };
  }
  if (!args.appointment_id || !args.nouveau_debut) {
    return { reporte: false, message: 'Précise le rendez-vous à reporter et le nouvel horaire.' };
  }

  const start = new Date(args.nouveau_debut);
  if (Number.isNaN(start.getTime())) return { reporte: false, message: 'Nouvel horaire invalide.' };
  if (start.getTime() < Date.now()) return { reporte: false, message: 'Ce créneau est déjà passé. Propose une date future.' };

  const appt = await ownedAppointment(dbClient, tenantId, patient.id, args.appointment_id);
  if (!appt) return { reporte: false, message: "Ce rendez-vous n'existe pas ou ne vous appartient pas." };
  if (appt.status === 'COMPLETED') return { reporte: false, message: 'Ce rendez-vous est déjà passé et ne peut plus être reporté.' };

  const svc = await dbClient.query(
    `SELECT duration_minutes FROM medical_services WHERE id = $1 AND tenant_id = $2`,
    [appt.medical_service_id, tenantId]
  );
  const duration = (svc.rowCount > 0 && svc.rows[0].duration_minutes) || 30;
  const end = new Date(start.getTime() + duration * 60 * 1000);

  try {
    const r = await dbClient.query(
      `UPDATE appointments SET time_slot = tstzrange($1, $2, '[)')
       WHERE id = $3 AND tenant_id = $4
       RETURNING lower(time_slot) AS debut, upper(time_slot) AS fin`,
      [start.toISOString(), end.toISOString(), args.appointment_id, tenantId]
    );
    return { reporte: true, debut: r.rows[0].debut, fin: r.rows[0].fin, message: 'Votre rendez-vous a bien été reporté.' };
  } catch (err) {
    if (err.code === '23P01') {
      return { reporte: false, creneau_occupe: true, message: 'Ce créneau vient d\'être pris. Propose un autre horaire.' };
    }
    throw err;
  }
}

const PUBLIC_TOOL_IMPLS = {
  lister_praticiens_et_prestations: listPractitionersAndServices,
  chercher_creneaux_disponibles: searchAvailableSlots,
  verifier_code_patient: verifyPatientCodePublic,
  preparer_reservation: prepareBooking,
  lister_mes_rendez_vous: listMyAppointments,
  annuler_mon_rendez_vous: cancelMyAppointment,
  reporter_mon_rendez_vous: rescheduleMyAppointment
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
