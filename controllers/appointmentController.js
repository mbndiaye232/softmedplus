const { logAudit } = require('../middleware/audit');
const crypto = require('crypto');

// Salle meet.jit.si dédiée à une téléconsultation : un nom suffisamment aléatoire
// pour ne pas être devinable, puisque n'importe qui connaissant le nom de la salle
// peut la rejoindre sur ce service public.
const generateVideoRoomSlug = () => `softmed-tc-${crypto.randomBytes(8).toString('hex')}`;

// Rappel automatique de RDV : normalise les 3 champs (activé, heures avant,
// canal) avec les mêmes valeurs par défaut partout où un rendez-vous est créé
// ou modifié - 3h avant par SMS, modifiable au cas par cas.
const normalizeReminderInput = (body) => {
  const enabled = body.reminder_enabled === undefined ? true : !!body.reminder_enabled;
  let hoursBefore = parseInt(body.reminder_hours_before, 10);
  if (!Number.isFinite(hoursBefore) || hoursBefore < 0) hoursBefore = 3;
  if (hoursBefore > 72) hoursBefore = 72;
  const channel = body.reminder_channel === 'WHATSAPP' ? 'WHATSAPP' : 'SMS';
  return { enabled, hoursBefore, channel };
};

// 1. Create Medical Service (Price catalog for Consultations, Treatments, Acts)
const createMedicalService = async (req, res) => {
  const { code, name, category, duration_minutes, price, deposit_amount, description, practitioner_id } = req.body;

  if (!code || !name || price === undefined || price === null) {
    return res.status(400).json({ error: 'Champs requis manquants: code, nom, tarif' });
  }

  const tenantId = req.user.tenant_id;

  try {
    const result = await req.dbClient.query(
      `INSERT INTO medical_services (tenant_id, code, name, category, duration_minutes, price, deposit_amount, description, practitioner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        tenantId,
        code.trim().toUpperCase(),
        name.trim(),
        (category || 'CONSULTATION').trim().toUpperCase(),
        parseInt(duration_minutes, 10) || 30,
        parseFloat(price) || 0,
        parseFloat(deposit_amount || 0),
        description ? description.trim() : null,
        practitioner_id || null
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create medical service error:', err.message);
    return res.status(500).json({ error: 'Échec de la création de la prestation: ' + err.message });
  }
};

// 2. Get Medical Services
const getMedicalServices = async (req, res) => {
  const tenantId = req.user.tenant_id;
  try {
    const result = await req.dbClient.query(
      `SELECT ms.*, p.first_name AS practitioner_first, p.last_name AS practitioner_last
       FROM medical_services ms
       LEFT JOIN practitioners p ON ms.practitioner_id = p.id
       WHERE ms.tenant_id = $1
       ORDER BY ms.is_active DESC, ms.category ASC, ms.name ASC`,
      [tenantId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get medical services error:', err.message);
    return res.status(500).json({ error: 'Échec de récupération des prestations' });
  }
};

// 2b. Update Medical Service
const updateMedicalService = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;
  const { code, name, category, duration_minutes, price, deposit_amount, description, practitioner_id, is_active } = req.body;

  if (!code || !name || price === undefined || price === null) {
    return res.status(400).json({ error: 'Champs requis manquants: code, nom, tarif' });
  }

  try {
    const result = await req.dbClient.query(
      `UPDATE medical_services
       SET code = $1,
           name = $2,
           category = $3,
           duration_minutes = $4,
           price = $5,
           deposit_amount = $6,
           description = $7,
           practitioner_id = $8,
           is_active = $9
       WHERE id = $10 AND tenant_id = $11
       RETURNING *`,
      [
        code.trim().toUpperCase(),
        name.trim(),
        (category || 'CONSULTATION').trim().toUpperCase(),
        parseInt(duration_minutes, 10) || 30,
        parseFloat(price) || 0,
        parseFloat(deposit_amount || 0),
        description ? description.trim() : null,
        practitioner_id || null,
        is_active !== undefined ? is_active : true,
        id,
        tenantId
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Prestation introuvable' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Update medical service error:', err.message);
    return res.status(500).json({ error: 'Échec de modification de la prestation: ' + err.message });
  }
};

// 2c. Delete Medical Service
const deleteMedicalService = async (req, res) => {
  const tenantId = req.user.tenant_id;
  const { id } = req.params;

  try {
    const linkedAppointments = await req.dbClient.query(
      `SELECT 1 FROM appointments WHERE medical_service_id = $1 LIMIT 1`,
      [id]
    );
    const linkedInvoiceLines = await req.dbClient.query(
      `SELECT 1 FROM invoice_lines WHERE service_id = $1 LIMIT 1`,
      [id]
    );

    if (linkedAppointments.rowCount > 0 || linkedInvoiceLines.rowCount > 0) {
      await req.dbClient.query(
        `UPDATE medical_services SET is_active = false WHERE id = $1 AND tenant_id = $2`,
        [id, tenantId]
      );
      return res.status(200).json({ message: 'Prestation désactivée (car déjà utilisée dans des factures ou RDV)' });
    }

    await req.dbClient.query(
      `DELETE FROM medical_services WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    return res.status(200).json({ message: 'Prestation supprimée avec succès' });
  } catch (err) {
    console.error('Delete medical service error:', err.message);
    return res.status(500).json({ error: 'Échec de suppression de la prestation: ' + err.message });
  }
};

// 3. Create Appointment (Booking)
const createAppointment = async (req, res) => {
  const { practitioner_id, patient_id, medical_service_id, start_time, booking_channel, consultation_mode } = req.body;
  const reminder = normalizeReminderInput(req.body);

  if (!practitioner_id || !patient_id || !medical_service_id || !start_time) {
    return res.status(400).json({ error: 'Required fields missing: practitioner_id, patient_id, medical_service_id, start_time' });
  }

  const tenantId = req.user.tenant_id;

  try {
    // A. Fetch service duration to calculate end time
    const serviceRes = await req.dbClient.query(
      `SELECT duration_minutes, deposit_amount FROM medical_services WHERE id = $1 AND tenant_id = $2`,
      [medical_service_id, tenantId]
    );

    if (serviceRes.rowCount === 0) {
      return res.status(404).json({ error: 'Medical service not found' });
    }

    const { duration_minutes, deposit_amount } = serviceRes.rows[0];

    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + duration_minutes * 60 * 1000);

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString();

    // B. Determine initial status based on whether a deposit is required
    const status = parseFloat(deposit_amount) > 0 ? 'PENDING_PAYMENT' : 'CONFIRMED';

    const isTeleconsultation = consultation_mode === 'TELECONSULTATION';
    const videoRoomSlug = isTeleconsultation ? generateVideoRoomSlug() : null;

    // C. Insert using PostgreSQL tstzrange function
    // Exclusive upper bound (Default) avoids overlap on the exact millisecond border
    const result = await req.dbClient.query(
      `INSERT INTO appointments (tenant_id, practitioner_id, patient_id, medical_service_id, time_slot, status, booking_channel, consultation_mode, video_room_slug, reminder_enabled, reminder_hours_before, reminder_channel)
       VALUES ($1, $2, $3, $4, tstzrange($5, $6, '[)'), $7, $8, $9, $10, $11, $12, $13)
       RETURNING *, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [
        tenantId,
        practitioner_id,
        patient_id,
        medical_service_id,
        startISO,
        endISO,
        status,
        booking_channel || 'DESK',
        isTeleconsultation ? 'TELECONSULTATION' : 'PRESENTIEL',
        videoRoomSlug,
        reminder.enabled,
        reminder.hoursBefore,
        reminder.channel
      ]
    );

    const appointment = result.rows[0];
    await logAudit(req, 'CREATE_APPOINTMENT', 'appointments', appointment.id);

    return res.status(201).json(appointment);

  } catch (err) {
    console.error('Create appointment error:', err.message);
    // 23P01 is the PostgreSQL error code for exclusion_violation
    if (err.code === '23P01') {
      return res.status(409).json({
        error: 'Double-booking conflict: This practitioner is already booked during this time slot'
      });
    }
    return res.status(500).json({ error: 'Failed to schedule appointment' });
  }
};

// 4. Get Appointments (with start/end times extracted from time_slot range)
const getAppointments = async (req, res) => {
  const { practitioner_id, start_date, end_date } = req.query;
  const tenantId = req.user.tenant_id;

  try {
    let queryStr = `
      SELECT a.id, a.practitioner_id, a.patient_id, a.medical_service_id, a.status, a.booking_channel, a.created_at,
             a.consultation_reason, a.consultation_mode, a.video_room_slug,
             a.reminder_enabled, a.reminder_hours_before, a.reminder_channel, a.reminder_sent_at,
             lower(a.time_slot) AS start_time, upper(a.time_slot) AS end_time,
             p.first_name AS patient_first, p.last_name AS patient_last, p.patient_code,
             prac.first_name AS doc_first, prac.last_name AS doc_last,
             COALESCE(NULLIF(a.consultation_reason, ''), ms.name, 'Consultation Médicale') AS service_name,
             COALESCE(NULLIF(ms.price, 0), prac.consultation_fee, 15000) AS price,
             COALESCE(ms.deposit_amount, 0) AS deposit_amount
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN practitioners prac ON a.practitioner_id = prac.id
      LEFT JOIN medical_services ms ON a.medical_service_id = ms.id
      WHERE a.tenant_id = $1 AND a.status != 'CANCELED'
    `;
    const params = [tenantId];

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (practitioner_id && uuidRegex.test(practitioner_id)) {
      params.push(practitioner_id);
      queryStr += ` AND a.practitioner_id = $${params.length}`;
    }

    if (start_date && end_date) {
      params.push(start_date);
      params.push(end_date);
      // Une journee se demande avec start_date = end_date. Or
      // tstzrange('2026-09-26', '2026-09-26') est un intervalle VIDE : aucun
      // rendez-vous ne le chevauche, et la journee paraissait donc totalement
      // libre. Quand la borne de fin est une date sans heure, elle couvre
      // desormais la journee entiere ; un horodatage complet reste pris tel quel.
      queryStr += ` AND a.time_slot && tstzrange(
        $${params.length - 1}::timestamptz,
        CASE WHEN $${params.length} ~ '^\\d{4}-\\d{2}-\\d{2}$'
             THEN ($${params.length}::date + INTERVAL '1 day')::timestamptz
             ELSE $${params.length}::timestamptz
        END
      )`;
    }

    queryStr += ` ORDER BY start_time ASC`;

    const result = await req.dbClient.query(queryStr, params);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get appointments error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve appointments: ' + err.message });
  }
};

// 3b. Request Appointment Booking (Vocal / Web / WhatsApp Intelligent & Secure Flow)
const requestAppointmentBooking = async (req, res) => {
  const {
    practitioner_id,
    medical_service_id,
    start_time,
    booking_channel, // 'VOICE_AGENT', 'WHATSAPP', 'WEB_PWA', 'DESK'
    consultation_mode,
    // Option A: Existing Patient
    patient_code,
    first_name,
    last_name,
    // Option B: New Patient
    is_new_patient,
    phone_number,
    gender,
    date_of_birth
  } = req.body;

  const tenantId = req.user.tenant_id;

  if (!practitioner_id || !medical_service_id || !start_time) {
    return res.status(400).json({ error: 'Champs requis manquants: praticien, prestation, date/heure' });
  }

  try {
    let finalPatientId = null;
    let finalPatientCode = null;
    let finalPatientFirst = first_name;
    let finalPatientLast = last_name;
    let isExistingVerified = false;
    let depositRequired = 0;

    const cleanStr = (s) => (s || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (patient_code && !is_new_patient) {
      // 1. Existing Patient Check
      const pRes = await req.dbClient.query(
        `SELECT id, patient_code, first_name, last_name, phone_number 
         FROM patients 
         WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2)) LIMIT 1`,
        [tenantId, patient_code.trim()]
      );

      if (pRes.rowCount === 0) {
        return res.status(404).json({
          error: `Code patient "${patient_code}" introuvable. Pour une première consultation, veuillez sélectionner "Nouveau Patient".`,
          code_not_found: true,
          requires_deposit: true,
          deposit_amount: 2000
        });
      }

      const foundPatient = pRes.rows[0];

      // Double confirmation Prénom & Nom
      if (first_name || last_name) {
        const matchFirst = !first_name || cleanStr(foundPatient.first_name).includes(cleanStr(first_name)) || cleanStr(first_name).includes(cleanStr(foundPatient.first_name));
        const matchLast = !last_name || cleanStr(foundPatient.last_name).includes(cleanStr(last_name)) || cleanStr(last_name).includes(cleanStr(foundPatient.last_name));

        if (!matchFirst || !matchLast) {
          return res.status(400).json({
            error: `Le prénom ou nom fourni ne correspond pas au dossier du code patient ${patient_code}. Veuillez vérifier votre saisie.`,
            identity_mismatch: true
          });
        }
      }

      finalPatientId = foundPatient.id;
      finalPatientCode = foundPatient.patient_code;
      finalPatientFirst = foundPatient.first_name;
      finalPatientLast = foundPatient.last_name;
      isExistingVerified = true;
      depositRequired = 0; // Existing patient -> 0 deposit
    } else {
      // 2. New Patient Registration & 2000 FCFA Deposit Requirement
      if (!first_name || !last_name || !phone_number) {
        return res.status(400).json({ error: 'Pour un nouveau patient, le prénom, le nom et le téléphone sont obligatoires' });
      }

      // Check if phone number already exists
      const existingPhone = await req.dbClient.query(
        `SELECT id, patient_code, first_name, last_name FROM patients WHERE tenant_id = $1 AND phone_number = $2 LIMIT 1`,
        [tenantId, phone_number.trim()]
      );

      if (existingPhone.rowCount > 0) {
        finalPatientId = existingPhone.rows[0].id;
        finalPatientCode = existingPhone.rows[0].patient_code;
        finalPatientFirst = existingPhone.rows[0].first_name;
        finalPatientLast = existingPhone.rows[0].last_name;
        isExistingVerified = true;
        depositRequired = 0;
      } else {
        // Generate new memorable short code
        let newCode = null;
        for (let i = 0; i < 10; i++) {
          const rand = Math.floor(1000 + Math.random() * 9000);
          const candidate = `SM-${rand}`;
          const chk = await req.dbClient.query(`SELECT 1 FROM patients WHERE tenant_id = $1 AND patient_code = $2`, [tenantId, candidate]);
          if (chk.rowCount === 0) {
            newCode = candidate;
            break;
          }
        }
        if (!newCode) newCode = `SM-${Math.floor(10000 + Math.random() * 90000)}`;

        let normalizedGender = 'M';
        if (gender) {
          const gUpper = gender.toString().trim().toUpperCase();
          if (gUpper === 'F' || gUpper === 'FEMININ' || gUpper === 'FEMALE' || gUpper === 'FEMME') {
            normalizedGender = 'F';
          } else {
            normalizedGender = 'M';
          }
        }

        const insRes = await req.dbClient.query(
          `INSERT INTO patients (tenant_id, patient_code, phone_number, first_name, last_name, gender, date_of_birth, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING *`,
          [
            tenantId,
            newCode,
            phone_number.trim(),
            first_name.trim(),
            last_name.trim(),
            normalizedGender,
            date_of_birth || '1990-01-01',
            'Externe'
          ]
        );
        const newPat = insRes.rows[0];
        finalPatientId = newPat.id;
        finalPatientCode = newPat.patient_code;
        finalPatientFirst = newPat.first_name;
        finalPatientLast = newPat.last_name;
        depositRequired = 2000; // 2 000 FCFA for new patient confirmation
        
        await req.dbClient.query(
          `INSERT INTO medical_records (tenant_id, patient_id, summary_notes) VALUES ($1, $2, '')`,
          [tenantId, newPat.id]
        );
      }
    }

    // A. Fetch service duration & pricing
    const serviceRes = await req.dbClient.query(
      `SELECT duration_minutes, price, name FROM medical_services WHERE id = $1`,
      [medical_service_id]
    );

    if (serviceRes.rowCount === 0) {
      return res.status(404).json({ error: 'Prestation médicale introuvable' });
    }

    const { duration_minutes, price, name: serviceName } = serviceRes.rows[0];
    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + (duration_minutes || 30) * 60 * 1000);

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString();

    const initialStatus = depositRequired > 0 ? 'PENDING_PAYMENT' : 'CONFIRMED';

    const isTeleconsultation = consultation_mode === 'TELECONSULTATION';
    const videoRoomSlug = isTeleconsultation ? generateVideoRoomSlug() : null;
    const reminder = normalizeReminderInput(req.body);

    // Insert Appointment
    const apptRes = await req.dbClient.query(
      `INSERT INTO appointments (tenant_id, practitioner_id, patient_id, medical_service_id, time_slot, status, booking_channel, consultation_mode, video_room_slug, reminder_enabled, reminder_hours_before, reminder_channel)
       VALUES ($1, $2, $3, $4, tstzrange($5, $6, '[)'), $7, $8, $9, $10, $11, $12, $13)
       RETURNING *, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [
        tenantId,
        practitioner_id,
        finalPatientId,
        medical_service_id,
        startISO,
        endISO,
        initialStatus,
        booking_channel || 'DESK',
        isTeleconsultation ? 'TELECONSULTATION' : 'PRESENTIEL',
        videoRoomSlug,
        reminder.enabled,
        reminder.hoursBefore,
        reminder.channel
      ]
    );

    const appointment = apptRes.rows[0];
    await logAudit(req, 'CREATE_APPOINTMENT_VERIFIED', 'appointments', appointment.id);

    return res.status(201).json({
      appointment,
      patient: {
        id: finalPatientId,
        patient_code: finalPatientCode,
        first_name: finalPatientFirst,
        last_name: finalPatientLast
      },
      is_new_patient: !isExistingVerified,
      deposit_required: depositRequired,
      deposit_amount: depositRequired,
      currency: 'FCFA',
      payment_instructions: depositRequired > 0 ? {
        amount: 2000,
        currency: 'FCFA',
        methods: ['Wave Sénégal', 'Orange Money Sénégal'],
        message: `Veuillez verser l'acompte de confirmation de 2 000 FCFA via Wave ou Orange Money pour valider définitivement votre créneau. Ce montant sera déduit de votre consultation (${price} FCFA).`,
        patient_code: finalPatientCode
      } : null,
      message: depositRequired > 0 
        ? `Pré-réservation enregistrée ! Nouveau Code Patient : ${finalPatientCode}. Acompte de confirmation requis : 2 000 FCFA.` 
        : `Rendez-vous confirmé avec succès pour le patient ${finalPatientCode} (${finalPatientFirst} ${finalPatientLast}) !`
    });

  } catch (err) {
    console.error('Request appointment booking error:', err.message);
    if (err.code === '23P01') {
      return res.status(409).json({
        error: 'Conflit de créneau : Ce praticien a déjà une consultation programmée sur cet horaire'
      });
    }
    return res.status(500).json({ error: 'Échec de la réservation: ' + err.message });
  }
};

// 5. Get Practitioners (Doctors catalog)
const getPractitioners = async (req, res) => {
  try {
    const result = await req.dbClient.query(
      `SELECT * FROM practitioners WHERE is_active = true ORDER BY first_name ASC`
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get practitioners error:', err.message);
    return res.status(500).json({ error: 'Failed to retrieve practitioners' });
  }
};


// ============================================================================
// 3c. Modification & Annulation de rendez-vous
// ============================================================================

/**
 * Reporte un rendez-vous (nouvel horaire, éventuellement autre praticien ou
 * prestation) et/ou change son statut.
 *
 * La nouvelle plage est recalculée à partir de la durée de la prestation, comme
 * à la création : sans cela un report vers une prestation de durée différente
 * laisserait une plage incohérente et fausserait la détection de chevauchement.
 */
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { start_time, practitioner_id, medical_service_id, status, consultation_reason } = req.body;
  const tenantId = req.user.tenant_id;

  // Chaque champ de rappel n'est modifié que s'il est explicitement fourni (sinon
  // COALESCE garde la valeur existante) - contrairement à normalizeReminderInput
  // (utilisée à la création) qui comblerait un champ absent par sa valeur par
  // défaut et écraserait donc silencieusement un réglage déjà personnalisé lors
  // d'une mise à jour partielle (ex: ne changer que le canal ne doit pas remettre
  // les heures-avant à 3 par défaut). Un rappel déjà envoyé repart à zéro dès que
  // l'heure du RDV ou un réglage de rappel change, sinon un RDV reporté ne
  // recevrait jamais de nouveau rappel.
  const reminderEnabledVal = req.body.reminder_enabled !== undefined ? !!req.body.reminder_enabled : null;
  const reminderChannelVal = req.body.reminder_channel !== undefined
    ? (req.body.reminder_channel === 'WHATSAPP' ? 'WHATSAPP' : 'SMS')
    : null;
  let reminderHoursVal = null;
  if (req.body.reminder_hours_before !== undefined) {
    let h = parseInt(req.body.reminder_hours_before, 10);
    if (!Number.isFinite(h) || h < 0) h = 3;
    if (h > 72) h = 72;
    reminderHoursVal = h;
  }
  const reminderFieldsProvided = reminderEnabledVal !== null || reminderChannelVal !== null || reminderHoursVal !== null;
  const shouldResetReminderSentAt = !!start_time || reminderFieldsProvided;

  try {
    const existingRes = await req.dbClient.query(
      `SELECT id, practitioner_id, medical_service_id, status,
              lower(time_slot) AS start_time, upper(time_slot) AS end_time
       FROM appointments WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    if (existingRes.rowCount === 0) {
      return res.status(404).json({ error: 'Rendez-vous introuvable.' });
    }
    const existing = existingRes.rows[0];

    // Un rendez-vous déjà honoré ne se replanifie pas : le modifier réécrirait
    // un acte médical qui a réellement eu lieu.
    if (existing.status === 'COMPLETED') {
      return res.status(409).json({
        error: "Ce rendez-vous est déjà terminé et ne peut plus être modifié.",
        appointment_completed: true
      });
    }

    const finalPractitionerId = practitioner_id || existing.practitioner_id;
    const finalServiceId = medical_service_id || existing.medical_service_id;

    let startISO = existing.start_time;
    let endISO = existing.end_time;

    if (start_time) {
      const startDate = new Date(start_time);
      if (Number.isNaN(startDate.getTime())) {
        return res.status(400).json({ error: 'Date et heure invalides (format ISO 8601 attendu).' });
      }

      const svcRes = await req.dbClient.query(
        `SELECT duration_minutes FROM medical_services WHERE id = $1 AND tenant_id = $2`,
        [finalServiceId, tenantId]
      );
      if (svcRes.rowCount === 0) {
        return res.status(404).json({ error: 'Prestation médicale introuvable.' });
      }
      const duration = svcRes.rows[0].duration_minutes || 30;
      startISO = startDate.toISOString();
      endISO = new Date(startDate.getTime() + duration * 60 * 1000).toISOString();
    }

    const result = await req.dbClient.query(
      `UPDATE appointments
       SET practitioner_id = $1,
           medical_service_id = $2,
           time_slot = tstzrange($3, $4, '[)'),
           status = COALESCE($5::appointment_status, status),
           consultation_reason = COALESCE($6, consultation_reason),
           reminder_enabled = COALESCE($9, reminder_enabled),
           reminder_hours_before = COALESCE($10, reminder_hours_before),
           reminder_channel = COALESCE($11::reminder_channel, reminder_channel),
           reminder_sent_at = CASE WHEN $12 THEN NULL ELSE reminder_sent_at END
       WHERE id = $7 AND tenant_id = $8
       RETURNING *, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [
        finalPractitionerId, finalServiceId, startISO, endISO, status || null, consultation_reason || null, id, tenantId,
        reminderEnabledVal,
        reminderHoursVal,
        reminderChannelVal,
        shouldResetReminderSentAt
      ]
    );

    await logAudit(req, 'UPDATE_APPOINTMENT', 'appointments', id);
    return res.status(200).json(result.rows[0]);

  } catch (err) {
    console.error('Update appointment error:', err.message);
    if (err.code === '23P01') {
      return res.status(409).json({
        error: "Ce créneau est déjà occupé par un autre rendez-vous de ce praticien. Choisissez un autre horaire.",
        slot_taken: true
      });
    }
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Statut de rendez-vous invalide.' });
    }
    return res.status(500).json({ error: 'Échec de la modification du rendez-vous : ' + err.message });
  }
};

/**
 * Annule un rendez-vous. L'annulation passe le statut à CANCELED plutôt que de
 * supprimer la ligne : une facture peut y être rattachée (invoices.appointment_id),
 * et l'historique des annulations et absences est une donnée de suivi médical.
 * La contrainte no_overlapping_appointments excluant déjà CANCELED, le créneau
 * redevient immédiatement réservable.
 */
const cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body || {};
  const tenantId = req.user.tenant_id;

  try {
    const existingRes = await req.dbClient.query(
      `SELECT id, status FROM appointments WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    if (existingRes.rowCount === 0) {
      return res.status(404).json({ error: 'Rendez-vous introuvable.' });
    }
    if (existingRes.rows[0].status === 'COMPLETED') {
      return res.status(409).json({
        error: "Ce rendez-vous est déjà terminé et ne peut plus être annulé.",
        appointment_completed: true
      });
    }
    if (existingRes.rows[0].status === 'CANCELED') {
      return res.status(200).json({ success: true, already_canceled: true, message: 'Ce rendez-vous était déjà annulé.' });
    }

    const result = await req.dbClient.query(
      `UPDATE appointments
       SET status = 'CANCELED',
           consultation_reason = COALESCE($1, consultation_reason)
       WHERE id = $2 AND tenant_id = $3
       RETURNING *, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [reason ? `Annulé : ${reason}` : null, id, tenantId]
    );

    await logAudit(req, 'CANCEL_APPOINTMENT', 'appointments', id);
    return res.status(200).json({ success: true, appointment: result.rows[0], message: 'Rendez-vous annulé. Le créneau est de nouveau disponible.' });

  } catch (err) {
    console.error('Cancel appointment error:', err.message);
    return res.status(500).json({ error: "Échec de l'annulation du rendez-vous : " + err.message });
  }
};

module.exports = {
  createMedicalService,
  getMedicalServices,
  updateMedicalService,
  deleteMedicalService,
  createAppointment,
  requestAppointmentBooking,
  getAppointments,
  updateAppointment,
  cancelAppointment,
  getPractitioners
};
