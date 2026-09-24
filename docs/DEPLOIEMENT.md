# Mise en ligne — marche à suivre

Architecture visée : **Cloudflare Worker** (frontend statique + relais d'API) → **Render** (backend Express, Francfort) → **Supabase** (PostgreSQL, Irlande) → **Cloudflare R2** (fichiers, bucket privé).

> **Pourquoi un Worker et non un projet Pages.** L'application appelle `/api` sur sa propre origine, ce qui est nécessaire pour que le cookie de session accompagne les images et les liens de téléchargement servis par `/api/files`. Or le fichier `_redirects` de Pages ne sait relayer que des chemins internes : « Proxying will only support relative URLs on your site. You cannot proxy external domains. » Un Worker avec fichiers statiques sert `public/` **et** relaie `/api/*` vers Render, en une seule origine.

L'ordre compte : le backend doit exister avant que le frontend puisse pointer dessus.

---

## 1. Cloudflare R2 — jeton d'accès

Le bucket `softmedplus-storage` existe déjà. Il reste à créer les clés.

1. Cloudflare → **R2 Object Storage** → **API** → **Manage API tokens** → **Create API token**.
2. Permission **Object Read & Write**, limitée au bucket `softmedplus-storage`.
3. Noter **Access Key ID** et **Secret Access Key**. Le secret n'est affiché **qu'une fois**.

> **Ne pas activer** la Public Development URL et ne pas ajouter de domaine personnalisé : le bucket doit rester privé. Les fichiers sont servis par l'application, via `/api/files`, après vérification du jeton et de la clinique.

---

## 2. Render — service backend

Créer un service à partir de `render.yaml` (Blueprint), puis renseigner les variables marquées « à définir » :

| Variable | Valeur |
|---|---|
| `DATABASE_URL` | la chaîne du rôle **`softmed_app`** du `.env` local — jamais celle du rôle `postgres`, qui contourne l'isolation entre cliniques |
| `JWT_SECRET` | **la même valeur que le `.env` local** |
| `HMAC_SECRET` | **la même valeur que le `.env` local** |
| `PUBLIC_BASE_URL` | l'adresse **publique du site**, celle du Worker — et non celle de Render. Elle sert à composer les liens de réinitialisation envoyés aux patients, qui doivent aboutir sur le site |
| `R2_ACCESS_KEY_ID` | étape 1 |
| `R2_SECRET_ACCESS_KEY` | étape 1 |
| `R2_ENDPOINT` | `https://<identifiant de compte>.r2.cloudflarestorage.com` — **sans** le nom du bucket à la fin |
| `R2_PUBLIC_URL` | **laisser vide** |

`NODE_ENV`, `PORT`, `DB_SSL` et `R2_BUCKET_NAME` sont déjà dans `render.yaml`.

### Pourquoi les mêmes secrets qu'en local

Les deux environnements partagent **la même base Supabase**. `HMAC_SECRET` signe les QR codes des ordonnances : avec deux valeurs différentes, une ordonnance émise depuis un poste local serait déclarée invalide en ligne, et inversement. `JWT_SECRET` signe également les jetons du portail patient.

---

## 3. Cloudflare Worker — frontend et relais d'API

Le dépôt contient déjà `wrangler.toml` et `worker.js`. Le Worker sert les fichiers de `public/` et relaie `/api/*` vers Render.

```bash
npx wrangler deploy
```

Une fois l'URL Render connue, renseigner `BACKEND_URL` — soit dans `wrangler.toml`, soit dans le tableau de bord du Worker (**Settings → Variables**), ce qui évite un redéploiement. C'est le **seul** endroit où l'adresse du backend est écrite.

Revenir ensuite à l'étape 2 pour donner à `PUBLIC_BASE_URL`, côté Render, l'adresse du Worker.

> `public/_redirects` a été supprimé : sa règle `/api/*` vers Render ne pouvait pas fonctionner, Pages ne relayant pas les domaines externes.

---

## 4. Vérifications après la première mise en ligne

À faire dans l'ordre, en s'arrêtant au premier échec.

| Vérification | Résultat attendu |
|---|---|
| Ouvrir l'URL du Worker | L'écran de connexion s'affiche |
| Se connecter | Le tableau de bord se charge avec les données de la clinique |
| Console du navigateur, onglet réseau | Les appels `/api/*` répondent 200, pas 404 ni CORS |
| Déposer un logo depuis **Paramètres & Configuration** | L'URL renvoyée commence par `/api/files/t/` — si elle commence par `/uploads/`, R2 n'est pas configuré et le fichier sera perdu au prochain déploiement |
| Bucket R2 → onglet Objects | L'objet apparaît sous `t/<identifiant de la clinique>/` |
| Recharger la page | Le logo s'affiche toujours, servi par `/api/files` |
| Redéployer le service Render, puis recharger | Le logo s'affiche encore — c'est ce qui prouve que le fichier n'est pas sur le disque éphémère |

### Si le logo ne s'affiche pas

- **401 sur `/api/files/...`** : le cookie `softmed_token` n'est pas transmis. Vérifier que l'appel passe bien par la même origine que la page, donc par le Worker, et non directement vers l'URL Render.
- **403** : la clé du fichier appartient à une autre clinique que celle du jeton.
- **404** : l'objet n'est pas dans le bucket — le dépôt est sans doute reparti sur le disque local, donc `R2_*` est incomplet.

---

## 5. Points connus, à traiter avant un usage réel

- **Vidéo de téléconsultation** : instance publique `meet.jit.si`, hébergement non maîtrisé.
- **SMS et WhatsApp** : aucun fournisseur implémenté, les envois sont simulés et journalisés.
- **Portail patient** : un jeton patient donne accès aux fichiers de sa clinique, les clés ne portant pas l'identifiant du patient. Les clés sont des UUID v4, donc indevinables.
- **Limitation de débit** : le compteur vit dans le processus. Avec plusieurs instances Render, la limite effective est multipliée par leur nombre.
- **Plan gratuit Render** : le service s'endort après 15 minutes sans trafic ; le premier appel suivant prend environ 30 à 60 secondes.
