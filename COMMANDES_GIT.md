# 🚀 Commandes Git Essentielles - Guide Rapide

## 📋 Commandes pour Configurer GitHub

### 1. Initialiser Git (si pas déjà fait)
```bash
git init
```

### 2. Vérifier le statut
```bash
git status
```

### 3. Ajouter tous les fichiers
```bash
git add .
```

### 4. Créer le premier commit
```bash
git commit -m "Initial commit: Application Angular d'extraction de documents"
```

### 5. Ajouter le remote GitHub
```bash
git remote add origin https://github.com/VOTRE-USERNAME/angular-document-extractor.git
```
⚠️ **Remplacez** `VOTRE-USERNAME` et `angular-document-extractor` par vos valeurs réelles.

### 6. Vérifier le remote
```bash
git remote -v
```

### 7. Pousser vers GitHub
```bash
git branch -M main
git push -u origin main
```

---

## 🔄 Commandes pour les Mises à Jour

### Ajouter des modifications
```bash
git add .
git commit -m "Description de vos modifications"
git push
```

### Voir l'historique
```bash
git log --oneline
```

### Voir les différences
```bash
git diff
```

---

## 🛠️ Commandes Utiles

### Changer l'URL du remote
```bash
git remote set-url origin https://github.com/VOTRE-USERNAME/nouveau-nom.git
```

### Supprimer le remote
```bash
git remote remove origin
```

### Voir les branches
```bash
git branch
```

### Créer une nouvelle branche
```bash
git checkout -b nom-de-la-branche
```

---

## ⚠️ Important

Avant de pousser, assurez-vous que :
- ✅ `.gitignore` contient `node_modules/` et `dist/`
- ✅ Vous avez créé le repository sur GitHub
- ✅ Vous avez l'URL correcte de votre repository
