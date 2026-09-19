// Applique toutes les migrations de la base, dans l'ordre, puis verifie que les
// objets attendus existent reellement.
//
// db-init.js ne joue que schema.sql et production_seed.sql : les colonnes et
// tables ajoutees apres coup (teleconsultation, portail patient, rappels de
// rendez-vous...) vivent dans les scripts migrate_*.js ci-dessous. Sans eux, une
// installation neuve demarre mais plante des qu'on touche a ces fonctionnalites.
//
// Chaque migration est idempotente (IF NOT EXISTS) : rejouer ce script est sans
// danger. La verification finale est necessaire car les scripts de migration
// journalisent leurs erreurs sans renvoyer de code de sortie non nul.

const { execFileSync } = require('child_process');
const path = require('path');
const pool = require('../config/db');

const MIGRATIONS = [
  'migrate_practitioners_and_specialties.js',
  'migrate_departments.js',
  'migrate_durations_and_unavailabilities.js',
  'migrate_unique_hospital_structure.js',
  'migrate_user_permissions.js',
  'migrate_patient_access_control.js',
  'migrate_patient_auth.js',
  'migrate_patient_password_reset.js',
  'migrate_appointment_reminders.js',
  'migrate_teleconsultation.js',
];

// [table, colonne] pour une colonne, [table, null] pour une table entiere.
const EXPECTED = [
  ['appointments', 'consultation_mode'],
  ['appointments', 'video_room_slug'],
  ['appointments', 'reminder_enabled'],
  ['appointments', 'reminder_channel'],
  ['appointments', 'reminder_hours_before'],
  ['appointments', 'reminder_sent_at'],
  ['patients', 'password_hash'],
  ['patients', 'two_factor_enabled'],
  ['patients', 'email'],
  ['patient_otp_codes', null],
  ['patient_password_reset_tokens', null],
  ['patient_record_access_grants', null],
  ['practitioner_unavailabilities', null],
  ['medical_specialties', null],
  ['medical_departments', null],
];

async function verify() {
  const missing = [];

  for (const [table, column] of EXPECTED) {
    const { rows } = column
      ? await pool.query(
          `SELECT 1 FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = $1 AND column_name = $2`,
          [table, column]
        )
      : await pool.query(
          `SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = $1`,
          [table]
        );

    if (rows.length === 0) {
      missing.push(column ? `${table}.${column}` : `table ${table}`);
    }
  }

  return missing;
}

async function main() {
  for (const script of MIGRATIONS) {
    console.log(`\n=== ${script}`);
    execFileSync(process.execPath, [path.join(__dirname, script)], { stdio: 'inherit' });
  }

  console.log('\n=== Verification du schema');
  const missing = await verify();

  if (missing.length > 0) {
    console.error('Migrations incompletes, objets absents de la base :');
    missing.forEach((item) => console.error(`  - ${item}`));
    console.error('\nRelire les messages d\'erreur des migrations ci-dessus.');
    process.exitCode = 1;
  } else {
    console.log(`Base a jour : ${EXPECTED.length} objets verifies.`);
  }

  await pool.end();
}

main().catch((err) => {
  console.error('Echec des migrations :', err.message);
  process.exit(1);
});
