# SoftMed Téléconsultation

Application de gestion de clinique : dossier patient, agenda, consultations, hospitalisation, pharmacie et facturation, avec **téléconsultation vidéo**, **portail patient** et **assistance IA**.

Application multi-structures : chaque structure sanitaire (« tenant ») ne voit que ses propres données, isolées au niveau de la base par les politiques RLS de PostgreSQL.

## Prérequis

- Node.js 16 ou supérieur
- PostgreSQL 14 ou supérieur

## Installation

```bash
npm install
cp .env.example .env
```

Renseigner ensuite `.env`. Au minimum : la connexion PostgreSQL (`DB_*`), `JWT_SECRET` et `HMAC_SECRET`. Sans SMTP, SMS ou R2, l'application démarre quand même : les envois d'e-mails, de SMS et de messages WhatsApp sont alors **simulés** (journalisés dans la console du serveur).

Générer un secret :

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Base de données

```bash
npm run setup
```

Cette commande enchaîne deux étapes :

| Commande | Rôle |
|---|---|
| `npm run db:init` | Crée la base si besoin, applique `db/schema.sql` et les données de départ |
| `npm run db:migrate` | Applique les migrations `db/migrate_*.js` puis vérifie que le schéma est complet |

`npm run db:migrate` est **indispensable** : la téléconsultation, le portail patient et les rappels de rendez-vous reposent sur des colonnes et des tables qui n'existent pas dans `schema.sql`. Les migrations sont idempotentes, les rejouer est sans danger.

### Base réelle, sans données de démonstration

`db:init` installe par défaut des cliniques et des comptes de démonstration (`db/production_seed.sql`, ou à défaut un administrateur dont le mot de passe est écrit dans `db/db-init.js`). Pour une base destinée à un usage réel :

```bash
SKIP_SEED=1 npm run setup
```

La base ne contient alors que le schéma. La première structure sanitaire se crée depuis l'écran d'inscription de l'application. Les catalogues de référence se chargent ensuite pour les structures existantes :

```bash
node db/seed_senegal_medications.js        # catalogue de médicaments
node seed-specialties-and-departments.js   # spécialités et services
```

### Base gérée (Supabase, Neon...)

Sur une base gérée, le schéma est posé par un rôle administrateur et l'application tourne avec un rôle restreint. Au démarrage, elle échoue alors sur ses propres instructions de mise à jour du schéma :

```
Error ensuring ai_llm_configs table: permission denied for schema public
Auto-migration notice: must be owner of table stock_items
```

`db/adopt_schema.js` donne au rôle applicatif la propriété du schéma **et** force les politiques RLS, sans quoi cette propriété ferait échapper l'application à l'isolation entre structures :

```bash
ADMIN_DATABASE_URL="postgresql://<admin>:<mdp>@<hote>:5432/postgres" APP_DB_ROLE=softmed_app node db/adopt_schema.js
```

Le rôle applicatif ne doit être ni superuser ni `BYPASSRLS` — sur Supabase, le rôle `postgres` est `BYPASSRLS` et ne convient donc pas pour l'application.

## Démarrage

```bash
npm start
```

Le serveur Express sert à la fois l'API (`/api`) et le frontend (dossier `public/`), par défaut sur le port 5000 (`PORT` dans `.env`).

## Déploiement

- **Frontend** : Cloudflare Pages, décrit par `wrangler.toml` (projet `softmedplus`), qui publie le dossier `public/`.
- **Backend** : Render, décrit par `render.yaml` (service `softmedplus-backend`, région Francfort).
- **Base** : Supabase, région européenne. `render.yaml` ne déclare aucune base : `DATABASE_URL` se renseigne dans le tableau de bord Render, avec le rôle applicatif — ni superuser ni `BYPASSRLS`.

Backend et base doivent rester dans la **même région** : l'application ouvre une transaction et plusieurs requêtes par appel d'API, et chaque aller-retour se paie autant de fois. La proximité entre le backend et la base compte davantage que la distance à l'utilisateur, le frontend étant déjà servi par le réseau de Cloudflare.

Le frontend appelle toujours `/api` sur sa propre origine. En production, c'est `public/_redirects` qui redirige `/api/*` vers le backend : **c'est le seul fichier où l'URL du backend est écrite**, à mettre à jour après le premier déploiement.

## Notes techniques

- **RLS** : le rôle PostgreSQL utilisé en local est souvent superuser et contourne alors toutes les politiques RLS. Un test vert en local ne prouve donc rien sur l'isolation entre structures en production, où le rôle applicatif ne l'est pas. Pour vérifier réellement un correctif d'isolation, utiliser un rôle non-superuser.
- **Téléconsultation** : la salle vidéo s'appuie sur l'instance publique `meet.jit.si`. L'hébergement de l'appel n'est donc pas maîtrisé — à revoir avant un usage soumis à des obligations de confidentialité médicale.
- **SMS et WhatsApp** : aucun fournisseur n'est implémenté à ce jour (`utils/sms.js`, `utils/whatsapp.js`). Les envois restent simulés tant qu'un connecteur n'est pas écrit.

## Documentation

- `docs/claude/` — proposition commerciale et guide d'utilisation
- `prd.md` — spécifications fonctionnelles
