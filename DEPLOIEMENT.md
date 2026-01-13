# 🚀 Guide de Déploiement en Production

Ce guide vous explique comment déployer votre application Angular en production sur différentes plateformes.

## 📋 Prérequis

Avant de déployer, assurez-vous d'avoir :
- ✅ Node.js installé
- ✅ Les dépendances installées (`npm install`)
- ✅ L'application fonctionne en local (`npm start`)

## 🔨 Étape 1 : Build de Production

### Compiler l'application

Exécutez la commande suivante pour créer une version optimisée pour la production :

```bash
npm run build
```

Cette commande va :
- Compiler TypeScript en JavaScript
- Minifier le code
- Optimiser les assets
- Créer les fichiers dans le dossier `dist/angular-document-extractor`

### Vérifier le build

Après le build, vous devriez voir un dossier `dist/angular-document-extractor` contenant :
- `index.html` - Page principale
- `main-[hash].js` - Code JavaScript principal
- `styles-[hash].css` - Styles CSS
- Autres assets nécessaires

Vous pouvez tester le build localement avec un serveur HTTP simple :

```bash
# Avec Python
cd dist/angular-document-extractor
python -m http.server 8000

# Avec Node.js (si vous avez http-server installé)
npx http-server dist/angular-document-extractor -p 8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## 🌐 Options de Déploiement

### Option 1 : Vercel (Recommandé - Gratuit et Simple)

Vercel est la solution la plus simple pour déployer une application Angular.

#### Installation

```bash
npm install -g vercel
```

#### Déploiement

1. **Connectez-vous à Vercel** :
```bash
vercel login
```

2. **Déployez l'application** :
```bash
vercel
```

3. **Suivez les instructions** :
   - Choisissez votre projet
   - Vercel détectera automatiquement Angular
   - L'application sera déployée et vous obtiendrez une URL

4. **Pour les déploiements suivants** :
```bash
vercel --prod
```

#### Configuration automatique avec GitHub

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez votre repository GitHub
3. Vercel détectera automatiquement Angular et configurera le build
4. Chaque push sur la branche principale déclenchera un nouveau déploiement

**Avantages** :
- ✅ Gratuit pour les projets personnels
- ✅ Déploiement automatique depuis GitHub
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ URL personnalisée

---

### Option 2 : Netlify (Gratuit et Simple)

#### Déploiement via l'interface web

1. Allez sur [netlify.com](https://netlify.com) et créez un compte
2. Connectez votre repository GitHub/GitLab/Bitbucket
3. Configurez le build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist/angular-document-extractor`
4. Cliquez sur "Deploy"

#### Déploiement via CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod --dir=dist/angular-document-extractor
```

**Avantages** :
- ✅ Gratuit pour les projets personnels
- ✅ Déploiement automatique
- ✅ HTTPS automatique
- ✅ Formulaires et fonctions serverless

---

### Option 3 : GitHub Pages (Gratuit)

#### Configuration

1. **Installez angular-cli-ghpages** :
```bash
npm install -g angular-cli-ghpages
```

2. **Build l'application** :
```bash
npm run build
```

3. **Déployez sur GitHub Pages** :
```bash
npx angular-cli-ghpages --dir=dist/angular-document-extractor
```

4. **Configurez GitHub** :
   - Allez dans Settings > Pages de votre repository
   - Sélectionnez la branche `gh-pages` comme source
   - Votre site sera disponible à : `https://votre-username.github.io/votre-repo`

**Note** : Pour les routes Angular, vous devrez configurer un fichier `404.html` qui redirige vers `index.html`.

**Avantages** :
- ✅ Gratuit
- ✅ Intégration avec GitHub
- ⚠️ Nécessite une configuration supplémentaire pour les routes

---

### Option 4 : Firebase Hosting (Gratuit)

#### Installation

```bash
npm install -g firebase-tools
```

#### Configuration

1. **Connectez-vous** :
```bash
firebase login
```

2. **Initialisez Firebase** :
```bash
firebase init
```

3. **Sélectionnez** :
   - ✅ Hosting
   - Choisissez votre projet Firebase (ou créez-en un)
   - **Public directory** : `dist/angular-document-extractor`
   - **Single-page app** : `Yes`
   - **Overwrite index.html** : `No`

4. **Déployez** :
```bash
npm run build
firebase deploy
```

**Avantages** :
- ✅ Gratuit avec quota généreux
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Intégration avec d'autres services Firebase

---

### Option 5 : AWS S3 + CloudFront

#### Configuration

1. **Installez AWS CLI** et configurez vos credentials

2. **Créez un bucket S3** :
```bash
aws s3 mb s3://votre-nom-bucket
```

3. **Configurez le bucket pour le hosting statique** :
```bash
aws s3 website s3://votre-nom-bucket --index-document index.html --error-document index.html
```

4. **Build et déployez** :
```bash
npm run build
aws s3 sync dist/angular-document-extractor s3://votre-nom-bucket --delete
```

5. **Configurez CloudFront** pour HTTPS et CDN (optionnel mais recommandé)

**Avantages** :
- ✅ Très scalable
- ✅ CDN global avec CloudFront
- ⚠️ Configuration plus complexe
- ⚠️ Coûts selon l'utilisation

---

## ⚙️ Configuration Importante

### 1. Mettre à jour l'URL du webhook n8n

Avant de déployer, assurez-vous que l'URL du webhook dans `src/angular-service-example.ts` est correcte pour la production :

```typescript
private readonly webhookUrl = 'https://votre-instance-n8n.com/webhook/extract-documents';
```

### 2. Gérer les variables d'environnement

Créez un fichier `src/environments/environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  webhookUrl: 'https://votre-instance-n8n.com/webhook/extract-documents'
};
```

Et `src/environments/environment.ts` pour le développement :

```typescript
export const environment = {
  production: false,
  webhookUrl: 'http://localhost:4200/api/webhook' // ou votre URL de dev
};
```

Puis dans `angular-service-example.ts` :

```typescript
import { environment } from '../environments/environment';

private readonly webhookUrl = environment.webhookUrl;
```

### 3. Configurer le base href

Si votre application n'est pas à la racine du domaine, configurez le `base href` dans `angular.json` :

```json
"build": {
  "options": {
    "baseHref": "/votre-chemin/"
  }
}
```

Ou lors du build :

```bash
ng build --base-href=/votre-chemin/
```

### 4. Gérer les routes Angular

Pour les applications avec routing, configurez le serveur pour rediriger toutes les routes vers `index.html`. 

**Pour Vercel/Netlify** : Créez un fichier `vercel.json` ou `netlify.toml` :

```json
{
  "rewrites": [
    { "source": "**", "destination": "/index.html" }
  ]
}
```

## 🔒 Sécurité et Performance

### 1. Activer HTTPS

Toutes les plateformes mentionnées activent HTTPS automatiquement. Assurez-vous que votre webhook n8n accepte les requêtes HTTPS.

### 2. Optimiser les performances

Le build de production optimise déjà :
- ✅ Minification du code
- ✅ Tree-shaking
- ✅ Compression des assets
- ✅ Lazy loading (si configuré)

### 3. CORS

Assurez-vous que votre instance n8n autorise les requêtes depuis votre domaine de production :

```
Access-Control-Allow-Origin: https://votre-domaine.com
```

## 📝 Checklist de Déploiement

Avant de déployer, vérifiez :

- [ ] Le build fonctionne localement (`npm run build`)
- [ ] L'URL du webhook n8n est correcte pour la production
- [ ] Les variables d'environnement sont configurées
- [ ] Le base href est correct si nécessaire
- [ ] Les routes Angular sont configurées (si applicable)
- [ ] CORS est configuré sur n8n
- [ ] HTTPS est activé
- [ ] Le domaine personnalisé est configuré (si nécessaire)

## 🐛 Résolution de Problèmes

### Erreur 404 sur les routes

Si vous obtenez des erreurs 404 lors de la navigation, configurez le serveur pour rediriger toutes les routes vers `index.html`.

### Erreur CORS

Si vous obtenez des erreurs CORS, vérifiez que votre instance n8n autorise les requêtes depuis votre domaine de production.

### Assets non chargés

Vérifiez que le `baseHref` est correctement configuré dans `angular.json`.

## 🎯 Recommandation

Pour un déploiement rapide et simple, je recommande **Vercel** :
- ✅ Configuration minimale
- ✅ Déploiement automatique depuis GitHub
- ✅ Gratuit pour les projets personnels
- ✅ Excellent support pour Angular

## 📚 Ressources

- [Documentation Angular - Déploiement](https://angular.io/guide/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
