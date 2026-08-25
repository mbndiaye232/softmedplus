const pool = require('../config/db');

// 1. Get Public Clinic Info & Catalog by Slug
const getPublicClinic = async (req, res) => {
  const { slug } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tenantRes = await client.query(
      `SELECT id, name, slug, phone_number, logo_url, address, email, gps_coordinates, settings 
       FROM tenants 
       WHERE LOWER(slug) = LOWER($1) AND is_active = true LIMIT 1`,
      [slug.trim()]
    );

    if (tenantRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Clinique introuvable ou désactivée' });
    }

    const tenant = tenantRes.rows[0];

    // Practitioners
    const pracRes = await client.query(
      `SELECT p.id, p.first_name, p.last_name, p.title, p.grade, p.color_code, p.specialty_name, p.is_general_practitioner,
              COALESCE(
                json_agg(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'color_code', s.color_code)) 
                FILTER (WHERE s.id IS NOT NULL), '[]'
              ) AS specialties
       FROM practitioners p
       LEFT JOIN practitioner_specialties ps ON p.id = ps.practitioner_id
       LEFT JOIN medical_specialties s ON ps.specialty_id = s.id
       WHERE p.tenant_id = $1 AND p.is_active = true
       GROUP BY p.id
       ORDER BY p.first_name ASC`,
      [tenant.id]
    );

    // Services
    const servRes = await client.query(
      `SELECT id, code, name, category, duration_minutes, price, deposit_amount, description
       FROM medical_services
       WHERE tenant_id = $1 AND is_active = true
       ORDER BY category ASC, name ASC`,
      [tenant.id]
    );

    // Upcoming appointments for slot availability (only start and end times)
    const apptRes = await client.query(
      `SELECT practitioner_id, lower(time_slot) AS start_time, upper(time_slot) AS end_time
       FROM appointments
       WHERE tenant_id = $1 AND status != 'CANCELED' AND upper(time_slot) >= NOW()`,
      [tenant.id]
    );

    await client.query('COMMIT');

    return res.status(200).json({
      clinic: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        phone_number: tenant.phone_number,
        logo_url: tenant.logo_url,
        address: tenant.address,
        email: tenant.email
      },
      practitioners: pracRes.rows,
      services: servRes.rows,
      bookedSlots: apptRes.rows
    });
  } catch (err) {
    console.error('Public clinic info error:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
  } finally {
    client.release();
  }
};

// 2. Get All Public Clinics List
const getPublicClinics = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const result = await client.query(
      `SELECT id, name, slug, phone_number, logo_url, address, email FROM tenants WHERE is_active = true ORDER BY name ASC`
    );

    await client.query('COMMIT');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Public clinics list error:', err.message);
    return res.status(500).json({ error: 'Échec de chargement des cliniques' });
  } finally {
    client.release();
  }
};

// 3. Public Verify Patient
const publicVerifyPatient = async (req, res) => {
  const { tenant_slug, patient_code, first_name, last_name } = req.body;
  if (!tenant_slug || !patient_code) {
    return res.status(400).json({ error: 'Clinique et Code Patient requis' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tRes = await client.query(`SELECT id FROM tenants WHERE LOWER(slug) = LOWER($1) LIMIT 1`, [tenant_slug.trim()]);
    if (tRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Clinique introuvable' });
    }
    const tenantId = tRes.rows[0].id;

    const pRes = await client.query(
      `SELECT id, patient_code, first_name, last_name, phone_number 
       FROM patients 
       WHERE tenant_id = $1 AND UPPER(TRIM(patient_code)) = UPPER(TRIM($2)) LIMIT 1`,
      [tenantId, patient_code.trim()]
    );

    if (pRes.rowCount === 0) {
      return res.status(200).json({
        exists: false,
        verified: false,
        requires_deposit: true,
        deposit_amount: 2000,
        message: `Code "${patient_code}" non trouvé. Versement d'un acompte de 2 000 FCFA requis pour les nouveaux patients.`
      });
    }

    const patient = pRes.rows[0];
    const cleanStr = (s) => (s || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (first_name || last_name) {
      const matchFirst = !first_name || cleanStr(patient.first_name).includes(cleanStr(first_name)) || cleanStr(first_name).includes(cleanStr(patient.first_name));
      const matchLast = !last_name || cleanStr(patient.last_name).includes(cleanStr(last_name)) || cleanStr(last_name).includes(cleanStr(patient.last_name));

      if (matchFirst && matchLast) {
        return res.status(200).json({
          exists: true,
          verified: true,
          requires_deposit: false,
          deposit_amount: 0,
          patient: {
            id: patient.id,
            patient_code: patient.patient_code,
            first_name: patient.first_name,
            last_name: patient.last_name,
            phone_number: patient.phone_number
          },
          message: `Identité vérifiée : ${patient.first_name} ${patient.last_name} (${patient.patient_code}). Réservation directe sans acompte.`
        });
      } else {
        return res.status(200).json({
          exists: true,
          verified: false,
          identity_mismatch: true,
          requires_deposit: true,
          deposit_amount: 2000,
          error: `Le prénom ou nom ne correspond pas au titulaire de ce code patient.`
        });
      }
    }

    return res.status(200).json({
      exists: true,
      verified: false,
      requires_confirmation: true,
      patient_code: patient.patient_code,
      message: 'Code patient valide. Veuillez confirmer le prénom et nom.'
    });

  } catch (err) {
    console.error('Public verify patient error:', err.message);
    return res.status(500).json({ error: 'Erreur de vérification: ' + err.message });
  } finally {
    client.release();
  }
};

// 4. Public Book Appointment
const publicBookAppointment = async (req, res) => {
  const {
    tenant_slug,
    practitioner_id,
    medical_service_id,
    start_time,
    booking_channel, // 'WEB_PWA', 'VOICE_AGENT', 'WHATSAPP'
    patient_code,
    first_name,
    last_name,
    is_new_patient,
    phone_number,
    gender,
    date_of_birth
  } = req.body;

  if (!tenant_slug || !start_time) {
    return res.status(400).json({ error: 'Informations de réservation incomplètes (clinique et date/heure requises)' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tRes = await client.query(`SELECT id, name FROM tenants WHERE LOWER(slug) = LOWER($1) LIMIT 1`, [tenant_slug.trim()]);
    if (tRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Clinique introuvable' });
    }
    const tenant = tRes.rows[0];
    const tenantId = tenant.id;

    let finalPractitionerId = practitioner_id;
    if (!finalPractitionerId) {
      const docRes = await client.query(`SELECT id FROM practitioners WHERE tenant_id = $1 AND is_active = true LIMIT 1`, [tenantId]);
      if (docRes.rowCount > 0) finalPractitionerId = docRes.rows[0].id;
    }

    let finalServiceId = medical_service_id;
    if (!finalServiceId) {
      const servRes = await client.query(`
        SELECT id FROM medical_services 
        WHERE tenant_id = $1 AND is_active = true 
        ORDER BY (practitioner_id = $2) DESC, (category = 'CONSULTATION') DESC, price DESC LIMIT 1
      `, [tenantId, finalPractitionerId]);
      if (servRes.rowCount > 0) finalServiceId = servRes.rows[0].id;
    }

    let finalPatientId = null;
    let finalPatientCode = null;
    let finalPatientFirst = first_name;
    let finalPatientLast = last_name;
    let isExistingVerified = false;
    let depositRequired = 0;

    const cleanStr = (s) => (s || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (patient_code && !is_new_patient) {
      const pRes = await client.query(
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

      if (first_name || last_name) {
        const matchFirst = !first_name || cleanStr(foundPatient.first_name).includes(cleanStr(first_name)) || cleanStr(first_name).includes(cleanStr(foundPatient.first_name));
        const matchLast = !last_name || cleanStr(foundPatient.last_name).includes(cleanStr(last_name)) || cleanStr(last_name).includes(cleanStr(foundPatient.last_name));
        if (!matchFirst || !matchLast) {
          return res.status(400).json({
            error: `Le prénom ou nom ne correspond pas au dossier du code ${patient_code}.`,
            identity_mismatch: true
          });
        }
      }

      finalPatientId = foundPatient.id;
      finalPatientCode = foundPatient.patient_code;
      finalPatientFirst = foundPatient.first_name;
      finalPatientLast = foundPatient.last_name;
      isExistingVerified = true;
      depositRequired = 0;
    } else {
      if (!first_name || !last_name || !phone_number) {
        return res.status(400).json({ error: 'Prénom, Nom et Numéro de téléphone sont obligatoires pour un nouveau patient.' });
      }

      const existingPhone = await client.query(
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
        let newCode = null;
        for (let i = 0; i < 10; i++) {
          const rand = Math.floor(1000 + Math.random() * 9000);
          const candidate = `SM-${rand}`;
          const chk = await client.query(`SELECT 1 FROM patients WHERE tenant_id = $1 AND patient_code = $2`, [tenantId, candidate]);
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

        const insRes = await client.query(
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
            date_of_birth || '1995-01-01',
            'Externe'
          ]
        );
        const newPat = insRes.rows[0];
        finalPatientId = newPat.id;
        finalPatientCode = newPat.patient_code;
        finalPatientFirst = newPat.first_name;
        finalPatientLast = newPat.last_name;
        depositRequired = 2000;

        await client.query(
          `INSERT INTO medical_records (tenant_id, patient_id, summary_notes) VALUES ($1, $2, '')`,
          [tenantId, newPat.id]
        );
      }
    }

    const serviceRes = await client.query(
      `SELECT duration_minutes, price, name FROM medical_services WHERE id = $1`,
      [finalServiceId]
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

    const apptRes = await client.query(
      `INSERT INTO appointments (tenant_id, practitioner_id, patient_id, medical_service_id, time_slot, status, booking_channel)
       VALUES ($1, $2, $3, $4, tstzrange($5, $6, '[)'), $7, $8)
       RETURNING *, lower(time_slot) AS start_time, upper(time_slot) AS end_time`,
      [
        tenantId,
        finalPractitionerId,
        finalPatientId,
        finalServiceId,
        startISO,
        endISO,
        initialStatus,
        booking_channel || 'WEB_PWA'
      ]
    );

    return res.status(201).json({
      success: true,
      appointment: apptRes.rows[0],
      clinic_name: tenant.name,
      patient: {
        id: finalPatientId,
        patient_code: finalPatientCode,
        first_name: finalPatientFirst,
        last_name: finalPatientLast
      },
      service_name: serviceName,
      service_price: price,
      deposit_required: depositRequired,
      deposit_amount: depositRequired,
      currency: 'FCFA',
      payment_instructions: depositRequired > 0 ? {
        amount: 2000,
        currency: 'FCFA',
        methods: ['Wave Sénégal', 'Orange Money Sénégal'],
        message: `Veuillez verser l'acompte de confirmation de 2 000 FCFA via Wave ou Orange Money pour valider définitivement votre réservation. Ce montant sera déduit de votre consultation (${price} FCFA).`,
        patient_code: finalPatientCode
      } : null,
      message: depositRequired > 0
        ? `Pré-réservation enregistrée ! Votre Code Patient est : ${finalPatientCode}. Acompte requis : 2 000 FCFA.`
        : `Votre rendez-vous est confirmé avec succès ! Code Patient : ${finalPatientCode}.`
    });

  } catch (err) {
    console.error('Public booking error:', err.message);
    if (err.code === '23P01' || (err.message && err.message.includes('no_overlapping_appointments'))) {
      return res.status(409).json({
        error: 'Ce créneau horaire est déjà réservé pour ce praticien. Veuillez sélectionner un autre horaire.'
      });
    }
    return res.status(500).json({ error: 'Échec de la réservation: ' + err.message });
  } finally {
    client.release();
  }
};

// 5. Calculate Dynamic Available Slots
const getPublicAvailableSlots = async (req, res) => {
  const { slug } = req.params;
  const { practitioner_id, service_id, date } = req.query;

  if (!slug || !date) {
    return res.status(400).json({ error: 'Clinique et Date sont requises' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SET LOCAL app.bypass_rls = 'true'");

    const tRes = await client.query(`SELECT id, name FROM tenants WHERE LOWER(slug) = LOWER($1) LIMIT 1`, [slug.trim()]);
    if (tRes.rowCount === 0) {
      await client.query('COMMIT');
      return res.status(404).json({ error: 'Clinique introuvable' });
    }
    const tenantId = tRes.rows[0].id;

    // 1. Doctor
    let docId = practitioner_id;
    if (!docId) {
      const dRes = await client.query(`SELECT id FROM practitioners WHERE tenant_id = $1 AND is_active = true ORDER BY first_name ASC LIMIT 1`, [tenantId]);
      if (dRes.rowCount > 0) docId = dRes.rows[0].id;
    }

    if (!docId) {
      return res.status(200).json({ duration_minutes: 15, slots: [] });
    }

    // 2. Determine Duration
    let durationMinutes = 15;
    if (service_id) {
      const sRes = await client.query(`SELECT duration_minutes FROM medical_services WHERE id = $1 AND tenant_id = $2`, [service_id, tenantId]);
      if (sRes.rowCount > 0 && sRes.rows[0].duration_minutes) {
        durationMinutes = parseInt(sRes.rows[0].duration_minutes) || 15;
      }
    } else {
      // Specialty default duration
      const specRes = await client.query(
        `SELECT COALESCE(s.default_duration_minutes, 15) AS duration
         FROM practitioner_specialties ps
         JOIN medical_specialties s ON ps.specialty_id = s.id
         WHERE ps.practitioner_id = $1 LIMIT 1`,
        [docId]
      );
      if (specRes.rowCount > 0) {
        durationMinutes = parseInt(specRes.rows[0].duration) || 15;
      }
    }

    // 3. Define clinic day bounds (08h00 to 18h00)
    const dayStartStr = `${date}T08:00:00`;
    const dayEndStr = `${date}T18:00:00`;
    const dayStart = new Date(dayStartStr);
    const dayEnd = new Date(dayEndStr);

    // 4. Fetch booked appointments for doctor on that day
    let bookedRanges = [];
    try {
      const apptRes = await client.query(
        `SELECT lower(time_slot) AS start_time, upper(time_slot) AS end_time 
         FROM appointments 
         WHERE tenant_id = $1 AND practitioner_id = $2 AND status != 'CANCELED'
           AND time_slot && tstzrange($3, $4)`,
        [tenantId, docId, dayStart.toISOString(), dayEnd.toISOString()]
      );
      bookedRanges = apptRes.rows.map(r => ({
        start: new Date(r.start_time).getTime(),
        end: new Date(r.end_time).getTime()
      }));
    } catch (e) {
      console.log('[Info] appointments check fallback:', e.message);
    }

    // 5. Fetch doctor unavailabilities
    let unavailRanges = [];
    try {
      const unavailRes = await client.query(
        `SELECT start_time, end_time, reason, all_day 
         FROM practitioner_unavailabilities 
         WHERE tenant_id = $1 AND practitioner_id = $2
           AND (start_time, end_time) OVERLAPS ($3, $4)`,
        [tenantId, docId, dayStart.toISOString(), dayEnd.toISOString()]
      );
      unavailRanges = unavailRes.rows.map(u => ({
        start: new Date(u.start_time).getTime(),
        end: new Date(u.end_time).getTime(),
        reason: u.reason,
        all_day: u.all_day
      }));
    } catch (e) {
      // Table might not exist yet
      unavailRanges = [];
    }

    await client.query('COMMIT');

    // 6. Generate candidate slots
    const slots = [];
    const now = Date.now();
    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = date === todayStr;
    let currentSlotStart = new Date(dayStart);

    while (currentSlotStart.getTime() + durationMinutes * 60 * 1000 <= dayEnd.getTime()) {
      const slotStartTime = currentSlotStart.getTime();
      const slotEndTime = slotStartTime + durationMinutes * 60 * 1000;
      const hours = String(currentSlotStart.getHours()).padStart(2, '0');
      const minutes = String(currentSlotStart.getMinutes()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;

      // Pause déjeuner (13:00 - 14:00)
      const isLunchTime = currentSlotStart.getHours() === 13;

      // Check overlap with booked appointments
      const isBooked = bookedRanges.some(b => (slotStartTime < b.end && slotEndTime > b.start));

      // Check overlap with doctor unavailabilities / leave
      const unavail = unavailRanges.find(u => (u.all_day || (slotStartTime < u.end && slotEndTime > u.start)));

      // Check past time (only if date is today)
      const isPast = isToday && slotStartTime < (now - 15 * 60 * 1000);

      const isAvailable = !isLunchTime && !isBooked && !unavail && !isPast;

      slots.push({
        time: timeStr,
        start_time: currentSlotStart.toISOString(),
        end_time: new Date(slotEndTime).toISOString(),
        duration_minutes: durationMinutes,
        available: isAvailable,
        reason: isBooked ? 'Déjà réservé' : (unavail ? (unavail.reason || 'Médecin indisponible') : (isLunchTime ? 'Pause déjeuner' : (isPast ? 'Créneau passé' : 'Disponible')))
      });

      // Increment by durationMinutes
      currentSlotStart = new Date(slotEndTime);
    }

    return res.status(200).json({
      date,
      practitioner_id: docId,
      duration_minutes: durationMinutes,
      total_slots: slots.length,
      available_count: slots.filter(s => s.available).length,
      slots
    });

  } catch (err) {
    console.error('Error calculating available slots:', err.message);
    return res.status(500).json({ error: 'Erreur lors du calcul des disponibilités' });
  } finally {
    client.release();
  }
};

module.exports = {
  getPublicClinic,
  getPublicClinics,
  getPublicAvailableSlots,
  publicVerifyPatient,
  publicBookAppointment
};
