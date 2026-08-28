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

const AGENT_TOOLS = [
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

async function executeTool(name, args, { dbClient, tenantId }) {
  const safeArgs = args && typeof args === 'object' ? args : {};
  if (name === 'chercher_creneaux_disponibles') return await searchAvailableSlots(dbClient, tenantId, safeArgs);
  if (name === 'verifier_patient_par_code') return await lookupPatientByCode(dbClient, tenantId, safeArgs);
  if (name === 'prendre_rendez_vous') return await bookAppointment(dbClient, tenantId, safeArgs);
  throw new Error(`Outil inconnu : ${name}`);
}

module.exports = {
  AGENT_TOOLS,
  executeTool
};
