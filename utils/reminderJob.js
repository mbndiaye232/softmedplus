const pool = require('../config/db');
const { sendSms } = require('./sms');
const { sendWhatsapp } = require('./whatsapp');

// Tâche interne uniquement (jamais exposée en route HTTP) : contrairement à un
// endpoint appelé pour un utilisateur/tenant précis, ce job doit voir tous les
// tenants pour repérer les rendez-vous dont le rappel arrive à échéance - un
// bypass RLS est ici légitime, à la différence d'un endpoint accessible au client
// (voir le correctif d'isolation multi-tenant appliqué plus tôt dans ce fork).
async function sendDueAppointmentReminders() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`SELECT set_config('app.bypass_rls', 'true', true)`);

    const dueRes = await client.query(`
      SELECT a.id, a.tenant_id, a.reminder_channel, a.consultation_mode, a.video_room_slug,
             lower(a.time_slot) AS start_time,
             p.first_name AS patient_first, p.last_name AS patient_last, p.phone_number,
             pr.first_name AS doc_first, pr.last_name AS doc_last, pr.title AS doc_title,
             t.name AS tenant_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      LEFT JOIN practitioners pr ON a.practitioner_id = pr.id
      JOIN tenants t ON a.tenant_id = t.id
      WHERE a.reminder_enabled = true
        AND a.reminder_sent_at IS NULL
        AND a.status = 'CONFIRMED'
        AND lower(a.time_slot) - make_interval(hours => a.reminder_hours_before) <= NOW()
        AND lower(a.time_slot) > NOW()
      FOR UPDATE OF a SKIP LOCKED
    `);

    for (const appt of dueRes.rows) {
      const when = new Date(appt.start_time).toLocaleString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
      });
      const doctorLabel = appt.doc_first ? `${appt.doc_title || 'Dr.'} ${appt.doc_first} ${appt.doc_last}` : 'votre praticien';
      let message = `SoftMed - Rappel : vous avez rendez-vous avec ${doctorLabel} le ${when} (${appt.tenant_name}).`;
      if (appt.consultation_mode === 'TELECONSULTATION' && appt.video_room_slug) {
        // Langue forcee en francais : sans ce parametre Jitsi suit la langue du
        // telephone ou la geolocalisation, et le patient tombe sur une salle
        // dans une langue qu'il ne lit pas.
        message += ` Téléconsultation, rejoignez via : https://meet.jit.si/${appt.video_room_slug}#config.defaultLanguage=%22fr%22`;
      }

      try {
        if (appt.reminder_channel === 'WHATSAPP') {
          await sendWhatsapp(appt.phone_number, message);
        } else {
          await sendSms(appt.phone_number, message);
        }
        await client.query(`UPDATE appointments SET reminder_sent_at = NOW() WHERE id = $1`, [appt.id]);
        console.log(`[REMINDER] Envoyé pour le RDV ${appt.id} (${appt.patient_first} ${appt.patient_last}, ${appt.reminder_channel})`);
      } catch (sendErr) {
        // Un échec d'envoi individuel ne doit pas bloquer les autres rappels dus
        // dans le même passage, ni annuler la transaction entière.
        console.error(`[REMINDER] Échec d'envoi pour le RDV ${appt.id}:`, sendErr.message);
      }
    }

    await client.query('COMMIT');
    return { checked: dueRes.rowCount };
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Reminder job error:', err.message);
    return { checked: 0, error: err.message };
  } finally {
    client.release();
  }
}

module.exports = { sendDueAppointmentReminders };
