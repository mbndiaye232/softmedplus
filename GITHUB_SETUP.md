# 📦 Configuration du Dépôt GitHub

Ce guide vous explique comment créer un dépôt GitHub et y pousser votre code pour le déploiement automatique.

## 🚀 Étape 1 : Créer un Dépôt sur GitHub

### Option A : Via l'interface web (Recommandé)

1. **Allez sur [github.com](https://github.com)** et connectez-vous (ou créez un compte)

2. **Cliquez sur le bouton "+" en haut à droite** → "New repository"

3. **Remplissez les informations** :
   - **Repository name** : `angular-document-extractor` (ou le nom de votre choix)
   - **Description** : "Application Angular pour l'extraction de documents"
   - **Visibilité** : 
     - ✅ **Public** (gratuit, visible par tous)
     - 🔒 **Private** (gratuit aussi, visible uniquement par vous)
   - ⚠️ **Ne cochez PAS** "Initialize this repository with a README" (vous avez déjà des fichiers)

4. **Cliquez sur "Create repository"**

5. **GitHub vous affichera des instructions** - notez l'URL de votre repository (ex: `https://github.com/votre-username/angular-document-extractor`)

---

## 🔧 Étape 2 : Initialiser Git dans votre Projet Local

### Vérifier si Git est installé

```bash
git --version
```

Si Git n'est pas installé, téléchargez-le depuis [git-scm.com](https://git-scm.com/)

### Initialiser Git dans votre projet

Ouvrez un terminal dans le dossier de votre projet (`c:\yericursor`) et exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: Application Angular d'extraction de documents"
```

---

## 📤 Étape 3 : Connecter votre Projet Local à GitHub

### Méthode 1 : Via HTTPS (Recommandé pour débutants)

1. **Copiez l'URL HTTPS de votre repository GitHub** (visible sur la page de votre repository)

2. **Ajoutez le remote** :
```bash
git remote add origin https://github.com/VOTRE-USERNAME/angular-document-extractor.git
```

⚠️ **Remplacez** `VOTRE-USERNAME` et `angular-document-extractor` par vos valeurs réelles.

3. **Vérifiez que c'est bien configuré** :
```bash
git remote -v
```

Vous devriez voir :
```
origin  https://github.com/VOTRE-USERNAME/angular-document-extractor.git (fetch)
origin  https://github.com/VOTRE-USERNAME/angular-document-extractor.git (push)
```

4. **Poussez votre code** :
```bash
git branch -M main
git push -u origin main
```

Si GitHub vous demande vos identifiants :
- **Username** : votre nom d'utilisateur GitHub
- **Password** : utilisez un **Personal Access Token** (voir ci-dessous)

### Méthode 2 : Via SSH (Plus sécurisé)

Si vous avez configuré SSH avec GitHub :

```bash
git remote add origin git@github.com:VOTRE-USERNAME/angular-document-extractor.git
git branch -M main
git push -u origin main
```

---

## 🔑 Étape 4 : Créer un Personal Access Token (si nécessaire)

Si GitHub vous demande un mot de passe, vous devez créer un **Personal Access Token** :

1. **Allez sur GitHub** → **Settings** (icône profil en haut à droite) → **Developer settings**

2. **Cliquez sur "Personal access tokens"** → **"Tokens (classic)"**

3. **Cliquez sur "Generate new token"** → **"Generate new token (classic)"**

4. **Configurez le token** :
   - **Note** : "Déploiement Angular" (ou un nom de votre choix)
   - **Expiration** : choisissez une durée (90 jours recommandé)
   - **Scopes** : cochez au minimum **`repo`** (accès complet aux repositories)

5. **Cliquez sur "Generate token"**

6. **⚠️ COPIEZ LE TOKEN IMMÉDIATEMENT** (vous ne pourrez plus le voir après)

7. **Utilisez ce token comme mot de passe** lors du `git push`

---

## 🔄 Étape 5 : Pousser les Modifications Futures

Chaque fois que vous modifiez votre code, poussez les changements :

```bash
# Voir les fichiers modifiés
git status

# Ajouter tous les changements
git add .

# Créer un commit
git commit -m "Description de vos modifications"

# Pousser vers GitHub
git push
```

---

## 🔗 Étape 6 : Connecter GitHub à Vercel/Netlify

### Pour Vercel

1. **Allez sur [vercel.com](https://vercel.com)** et connectez-vous

2. **Cliquez sur "Add New..."** → **"Project"**

3. **Cliquez sur "Import Git Repository"**

4. **Autorisez Vercel à accéder à GitHub** (si demandé)

5. **Sélectionnez votre repository** `angular-document-extractor`

6. **Vercel détectera automatiquement Angular** :
   - **Framework Preset** : Angular
   - **Build Command** : `npm run build` (ou `ng build`)
   - **Output Directory** : `dist/angular-document-extractor`
   - **Install Command** : `npm install`

7. **Cliquez sur "Deploy"**

8. **✅ C'est fait !** Votre application sera déployée automatiquement

### Pour Netlify

1. **Allez sur [netlify.com](https://netlify.com)** et connectez-vous

2. **Cliquez sur "Add new site"** → **"Import an existing project"**

3. **Choisissez "GitHub"** et autorisez l'accès

4. **Sélectionnez votre repository** `angular-document-extractor`

5. **Configurez le build** :
   - **Build command** : `npm run build:prod`
   - **Publish directory** : `dist/angular-document-extractor`

6. **Cliquez sur "Deploy site"**

7. **✅ C'est fait !** Votre application sera déployée automatiquement

---

## ⚙️ Configuration du Déploiement Automatique

Une fois connecté, chaque fois que vous poussez du code sur la branche `main` (ou `master`), Vercel/Netlify déploiera automatiquement votre application.

### Workflow typique :

```bash
# 1. Modifier votre code
# 2. Tester localement
npm start

# 3. Pousser vers GitHub
git add .
git commit -m "Amélioration du formulaire"
git push

# 4. Vercel/Netlify déploie automatiquement ! 🚀
```

---

## 📝 Checklist Complète

- [ ] Compte GitHub créé
- [ ] Repository GitHub créé
- [ ] Git initialisé dans le projet local (`git init`)
- [ ] Fichiers ajoutés et commités (`git add .` et `git commit`)
- [ ] Remote GitHub ajouté (`git remote add origin`)
- [ ] Code poussé vers GitHub (`git push`)
- [ ] Repository connecté à Vercel/Netlify
- [ ] Déploiement automatique configuré

---

## 🐛 Résolution de Problèmes

### Erreur : "remote origin already exists"

Si vous avez déjà un remote, supprimez-le d'abord :
```bash
git remote remove origin
git remote add origin https://github.com/VOTRE-USERNAME/angular-document-extractor.git
```

### Erreur : "failed to push some refs"

Si GitHub a créé un README, vous devez d'abord faire un pull :
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Erreur d'authentification

Assurez-vous d'utiliser un **Personal Access Token** et non votre mot de passe GitHub.

### Voir l'URL du remote

```bash
git remote -v
```

### Changer l'URL du remote

```bash
git remote set-url origin https://github.com/VOTRE-USERNAME/nouveau-nom.git
```

---

## 💡 Astuces

1. **Commits réguliers** : Faites des commits fréquents avec des messages clairs
2. **Branches** : Utilisez des branches pour les nouvelles fonctionnalités
3. **.gitignore** : Assurez-vous que `node_modules/` et `dist/` sont dans `.gitignore`
4. **README.md** : Ajoutez une description de votre projet dans le README

---

## 📚 Ressources

- [Documentation Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Créer un Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
