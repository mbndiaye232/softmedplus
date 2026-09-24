// Donne au role applicatif la propriete du schema public, et force les
// politiques RLS pour que cette propriete ne les court-circuite pas.
//
// Pourquoi : au demarrage, server.js joue des ALTER TABLE et aiCopilotController
// un CREATE TABLE. Sur une base geree (Supabase, Neon...), le schema est pose
// par un role administrateur et l'application tourne avec un role restreint :
// ces instructions echouent a chaque lancement.
//   Error ensuring ai_llm_configs table: permission denied for schema public
//   Auto-migration notice: must be owner of table stock_items
//
// Le piege : un PROPRIETAIRE de table echappe par defaut aux politiques RLS.
// Donner la propriete sans plus supprimerait l'isolation entre structures
// sanitaires. FORCE ROW LEVEL SECURITY applique les politiques au proprietaire
// lui aussi, ce qui retablit l'isolation.
//
// Usage (avec les identifiants ADMINISTRATEUR de la base, pas ceux de l'app) :
//   ADMIN_DATABASE_URL="postgresql://postgres.<ref>:<mdp>@<hote>:5432/postgres" \
//   APP_DB_ROLE=softmed_app node db/adopt_schema.js
require('dotenv').config();
const { Client } = require('pg');

const adminUrl = process.env.ADMIN_DATABASE_URL;
const appRole = process.env.APP_DB_ROLE || 'softmed_app';

if (!adminUrl) {
  console.error('ADMIN_DATABASE_URL manquante : il faut la chaine de connexion administrateur.');
  process.exit(1);
}
if (!/^[a-z_][a-z0-9_]*$/.test(appRole)) {
  console.error(`Nom de role invalide : ${appRole}`);
  process.exit(1);
}

const client = new Client({ connectionString: adminUrl, ssl: { rejectUnauthorized: false } });
const quote = (id) => '"' + id.replace(/"/g, '""') + '"';

async function main() {
  await client.connect();

  const role = await client.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [appRole]);
  if (role.rowCount === 0) {
    throw new Error(`Le role ${appRole} n'existe pas.`);
  }

  // Transferer une propriete exige d'etre membre du role destinataire...
  await client.query(`GRANT ${quote(appRole)} TO CURRENT_USER`);

  // ... et exige aussi que le futur proprietaire ait le droit CREATE sur le
  // schema qui contient l'objet. Sans ce GRANT prealable, chaque
  // ALTER ... OWNER TO echoue avec "permission denied for schema public".
  await client.query(`GRANT CREATE ON SCHEMA public TO ${quote(appRole)}`);
  console.log('Droit de creation accorde dans le schema public.');

  const objets = await client.query(
    `SELECT c.relname, c.relkind, c.relrowsecurity
       FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relkind IN ('r', 'v', 'S')
      ORDER BY c.relkind, c.relname`
  );

  const motCle = { r: 'TABLE', v: 'VIEW', S: 'SEQUENCE' };
  const compte = { r: 0, v: 0, S: 0 };
  for (const o of objets.rows) {
    await client.query(`ALTER ${motCle[o.relkind]} public.${quote(o.relname)} OWNER TO ${quote(appRole)}`);
    compte[o.relkind] += 1;
  }
  console.log(`Propriete transferee a ${appRole} : ${compte.r} tables, ${compte.v} vue(s), ${compte.S} sequence(s).`);

  let forcees = 0;
  for (const o of objets.rows.filter((x) => x.relkind === 'r' && x.relrowsecurity)) {
    await client.query(`ALTER TABLE public.${quote(o.relname)} FORCE ROW LEVEL SECURITY`);
    forcees += 1;
  }
  console.log(`FORCE ROW LEVEL SECURITY active sur ${forcees} tables.`);

  const restantes = await client.query(
    `SELECT count(*)::int AS n
       FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relkind = 'r'
        AND c.relrowsecurity AND NOT c.relforcerowsecurity`
  );

  if (restantes.rows[0].n > 0) {
    console.error(`${restantes.rows[0].n} table(s) ont RLS sans forcage : l'isolation reste contournable par le proprietaire.`);
    process.exitCode = 1;
  } else {
    console.log('Verification : aucune table RLS non forcee.');
  }
}

main()
  .catch((err) => { console.error('Echec :', err.message); process.exitCode = 1; })
  .finally(() => client.end().catch(() => {}));
