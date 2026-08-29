/**
 * Outils exposés au Copilote/Agent IA pour agir sur SoftMed (function calling).
 *
 * Le LLM ne reçoit jamais d'accès direct à la base : il ne peut que demander
 * l'exécution d'un de ces outils, avec des arguments qu'il choisit. C'est cette
 * fonction (`executeTool`) qui exécute réellement la requête, via `req.dbClient`
 * (posé par tenantIsolator, donc déjà isolé par tenant et RLS) — jamais via le
 * pool brut, pour ne pas reproduire le bug corrigé dans aiCopilotController.js.
 */

const crypto = require('crypto');
const { generatePatientCode } = require('../controllers/patientController');

const AGENT_TOOLS = [
  {
    name: 'enregistrer_nouveau_patient',
    description: "Crée un dossier patient minimal (code SM-XXXX généré automatiquement) pour une personne qui n'a pas encore de code patient. À utiliser avant de proposer un rendez-vous à quelqu'un qui n'est pas déjà client. Si le numéro de téléphone est déjà enregistré, retourne le dossier existant au lieu d'en créer un doublon.",
    parameters: {
      type: 'object',
      properties: {
        first_name: { type: 'string', description: 'Prénom du patient' },
        last_name: { type: 'string', description: 'Nom du patient' },
        phone_number: { type: 'string', description: 'Numéro de téléphone, ex: 776473506' },
        gender: { type: 'string', description: "'M' (homme) ou 'F' (femme)" },
        date_of_birth: { type: 'string', description: "Date de naissance au format AAAA-MM-JJ. Demande-la explicitement si elle n'a pas été donnée — ne l'invente jamais." }
      },
      required: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth']
    }
  },
  {
    name: 'chercher_creneaux_disponibles',
    description: "Cherche les créneaux de rendez-vous disponibles pour un praticien à une date donnée (horaires de la clinique : 08h00-18h00). À utiliser avant de proposer un rendez-vous à l'utilisateur.",
    parameters: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Date au format AAAA-MM-JJ' },
        practitioner_id: { type: 'string', description: "Identifiant du praticien. Si absent, le premier praticien actif de la clinique est utilisé." },
        medical_service_id: { type: 'string', description: 'Identifiant de la prestation demandée, si connu — détermine la durée du créneau.' }
      },
      required: ['date']
    }
  },
  {
    name: 'verifier_patient_par_code',
    description: "Retrouve un patient à partir de son code (ex: SM-4821) pour confirmer son identité avant de prendre un rendez-vous ou de consulter son dossier.",
    parameters: {
      type: 'object',
      properties: { patient_code: { type: 'string', description: 'Code patient, ex: SM-4821' } },
      required: ['patient_code']
    }
  },
  {
    name: 'prendre_rendez_vous',
    description: "Crée un rendez-vous confirmé. N'utilise cet outil qu'après avoir confirmé explicitement le patient, le praticien, la date et l'heure avec l'utilisateur — jamais de manière spéculative.",
    parameters: {
      type: 'object',
      properties: {
        patient_id: { type: 'string' },
        practitioner_id: { type: 'string' },
        medical_service_id: { type: 'string' },
        start_time: { type: 'string', description: "Date et heure de début au format ISO 8601, ex: 2026-09-02T10:00:00" },
        motif: { type: 'string', description: 'Motif de consultation, si mentionné par l\'utilisateur' }
      },
      required: ['patient_id', 'practitioner_id', 'medical_service_id', 'start_time']
    }
  }
];

async function searchAvailableSlots(dbClient, tenantId, { date, practitioner_id, medical_service_id }) {
  if (!date) throw new Error('Le paramètre "date" est requis (format AAAA-MM-JJ).');

  let docId = practitioner_id;
  if (!docId) {
    const d = await dbClient.query(
      `SELECT id FROM practitioners WHERE tenant_id = $1 AND is_active = true ORDER BY first_name ASC LIMIT 1`,
      [tenantId]
    );
    if (d.rowCount === 0) return { slots: [], message: 'Aucun praticien actif dans cette clinique.' };
    docId = d.rows[0].id;
  }

  let durationMinutes = 15;
  if (medical_service_id) {
    const s = await dbClient.query(`SELECT duration_minutes FROM medical_services WHERE id = $1 AND tenant_id = $2`, [medical_service_id, tenantId]);
    if (s.rowCount > 0 && s.rows[0].duration_minutes) durationMinutes = parseInt(s.rows[0].duration_minutes, 10) || 15;
  } else {
    const spec = await dbClient.query(
      `SELECT COALESCE(s.default_duration_minutes, 15) AS duration
       FROM practitioner_specialties ps
       JOIN medical_specialties s ON ps.specialty_id = s.id
       WHERE ps.practitioner_id = $1 LIMIT 1`,
      [docId]
    );
    if (spec.rowCount > 0) durationMinutes = parseInt(spec.rows[0].duration, 10) || 15;
  }

  const dayStart = new Date(`${date}T08:00:00`);
  const dayEnd = new Date(`${date}T18:00:00`);
  if (Number.isNaN(dayStart.getTime())) throw new Error('Date invalide, attendu le format AAAA-MM-JJ.');

  const booked = await dbClient.query(
    `SELECT lower(time_slot) AS start_time, upper(time_slot) AS end_time
     FROM appointments
     WHERE tenant_id = $1 AND practitioner_id = $2 AND status != 'CANCELED'
       AND time_slot && tstzrange($3, $4)`,
    [tenantId, docId, dayStart.toISOString(), dayEnd.toISOString()]
  );
  const bookedRanges = booked.rows.map((r) => ({ start: new Date(r.start_time).getTime(), end: new Date(r.end_time).getTime() }));

  const slots = [];
  const stepMs = durationMinutes * 60 * 1000;
  for (let t = dayStart.getTime(); t + stepMs <= dayEnd.getTime(); t += stepMs) {
    const overlaps = bookedRanges.some((r) => t < r.end && t + stepMs > r.start);
    if (!overlaps) slots.push(new Date(t).toISOString());
  }

  return { practitioner_id: docId, duration_minutes: durationMinutes, slots };
}

async function lookupPatientByCode(dbClient, tenantId, { patient_code }) {
  if (!patient_code) throw new Error('Le paramètre "patient_code" est requis.');
  const r = await dbClient.query(
    `SELECT id, patient_code, first_name, last_name, phone_number, gender, date_of_birth
     FROM patients WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2)) LIMIT 1`,
    [tenantId, patient_code]
  );
  if (r.rowCount === 0) return { found: false, message: `Aucun patient trouvé avec le code ${patient_code}.` };
  return { found: true, patient: r.rows[0] };
}

async function registerNewPatient(dbClient, tenantId, { first_name, last_name, phone_number, gender, date_of_birth }) {
  if (!first_name || !last_name || !phone_number || !gender || !date_of_birth) {
    throw new Error('first_name, last_name, phone_number, gender et date_of_birth sont tous requis.');
  }
  const cleanPhone = String(phone_number).trim();
  const normalizedGender = String(gender).trim().toUpperCase().startsWith('F') ? 'F' : 'M';

  // Savepoint autour de la tentative d'insertion : en cas de conflit sur le
  // téléphone, Postgres met la transaction en état "aborted" et refuse toute
  // nouvelle requête (y compris la recherche du patient existant ci-dessous)
  // tant qu'on n'est pas revenu à ce point de reprise.
  await dbClient.query('SAVEPOINT register_new_patient');
  try {
    // Même génération de code (SM-XXXX) que l'inscription depuis l'interface —
    // pas de logique dupliquée ou divergente entre les deux chemins de création.
    const patientCode = await generatePatientCode(dbClient, tenantId);
    const result = await dbClient.query(
      `INSERT INTO patients (tenant_id, patient_code, phone_number, first_name, last_name, gender, date_of_birth, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Externe')
       RETURNING id, patient_code, first_name, last_name, phone_number, gender, date_of_birth`,
      [tenantId, patientCode, cleanPhone, first_name.trim(), last_name.trim(), normalizedGender, date_of_birth]
    );
    const patient = result.rows[0];
    await dbClient.query(`INSERT INTO medical_records (tenant_id, patient_id, summary_notes) VALUES ($1, $2, '')`, [tenantId, patient.id]);
    await dbClient.query('RELEASE SAVEPOINT register_new_patient');
    return { created: true, patient };
  } catch (err) {
    await dbClient.query('ROLLBACK TO SAVEPOINT register_new_patient');
    if (err.message && err.message.includes('unique_tenant_phone')) {
      const existing = await dbClient.query(
        `SELECT id, patient_code, first_name, last_name, phone_number, gender, date_of_birth FROM patients WHERE tenant_id = $1 AND phone_number = $2 LIMIT 1`,
        [tenantId, cleanPhone]
      );
      if (existing.rowCount > 0) {
        return { created: false, already_existed: true, patient: existing.rows[0], message: 'Un patient avec ce numéro de téléphone existe déjà : utilise ce dossier, ne crée pas de doublon.' };
      }
    }
    throw err;
  }
}

async function bookAppointment(dbClient, tenantId, { patient_id, practitioner_id, medical_service_id, start_time, motif }) {
  if (!patient_id || !practitioner_id || !medical_service_id || !start_time) {
    throw new Error('patient_id, practitioner_id, medical_service_id et start_time sont tous requis.');
  }

  const svc = await dbClient.query(`SELECT duration_minutes, deposit_amount FROM medical_services WHERE id = $1 AND tenant_id = $2`, [medical_service_id, tenantId]);
  if (svc.rowCount === 0) throw new Error("Prestation introuvable pour cette clinique.");
  const { duration_minutes, deposit_amount } = svc.rows[0];

  const start = new Date(start_time);
  if (Number.isNaN(start.getTime())) throw new Error('start_time invalide, attendu un horodatage ISO 8601.');
  const end = new Date(start.getTime() + (duration_minutes || 30) * 60 * 1000);
  const status = parseFloat(deposit_amount) > 0 ? 'PENDING_PAYMENT' : 'CONFIRMED';

  try {
    const r = await dbClient.query(
      `INSERT INTO appointments (tenant_id, practitioner_id, patient_id, medical_service_id, consultation_reason, time_slot, status, booking_channel)
       VALUES ($1, $2, $3, $4, $5, tstzrange($6, $7, '[)'), $8, 'VOICE_AGENT')
       RETURNING id, status, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [tenantId, practitioner_id, patient_id, medical_service_id, motif || null, start.toISOString(), end.toISOString(), status]
    );
    return { booked: true, appointment: r.rows[0] };
  } catch (err) {
    if (err.code === '23P01') {
      // no_overlapping_appointments (EXCLUDE constraint)
      return { booked: false, message: 'Ce créneau vient d\'être pris par un autre rendez-vous. Propose un autre horaire.' };
    }
    throw err;
  }
}

const TOOL_IMPLS = {
  chercher_creneaux_disponibles: searchAvailableSlots,
  verifier_patient_par_code: lookupPatientByCode,
  enregistrer_nouveau_patient: registerNewPatient,
  prendre_rendez_vous: bookAppointment
};

async function executeTool(name, args, { dbClient, tenantId }) {
  const impl = TOOL_IMPLS[name];
  if (!impl) throw new Error(`Outil inconnu : ${name}`);
  const safeArgs = args && typeof args === 'object' ? args : {};

  // Filet de sécurité général : le LLM peut fournir un argument mal formé (UUID
  // invalide, etc.) à n'importe quel outil. Sans ce savepoint, une telle erreur
  // avorterait la transaction PostgreSQL pour le reste de la conversation, alors
  // que l'agent doit pouvoir continuer après un échec d'outil (relancer le LLM
  // avec le message d'erreur, essayer autre chose).
  await dbClient.query('SAVEPOINT agent_tool_call');
  try {
    const result = await impl(dbClient, tenantId, safeArgs);
    await dbClient.query('RELEASE SAVEPOINT agent_tool_call');
    return result;
  } catch (err) {
    await dbClient.query('ROLLBACK TO SAVEPOINT agent_tool_call');
    throw err;
  }
}

module.exports = {
  AGENT_TOOLS,
  executeTool,
  // Réutilisé tel quel par l'agent du portail public : la recherche de créneaux
  // est en lecture seule et ne révèle que des disponibilités, déjà publiques.
  searchAvailableSlots
};
