# ⚡ Déploiement Rapide - 5 Minutes

## Option 1 : Vercel (Recommandé - Le Plus Simple)

### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2 : Se connecter
```bash
vercel login
```

### Étape 3 : Déployer
```bash
npm run build:prod
vercel
```

Suivez les instructions à l'écran. Votre application sera en ligne en quelques secondes !

### Étape 4 : Déploiement automatique depuis GitHub

1. **Poussez votre code sur GitHub** (si ce n'est pas déjà fait)
2. **Allez sur [vercel.com](https://vercel.com)** et créez un compte
3. **Cliquez sur "New Project"**
4. **Importez votre repository GitHub**
5. **Vercel détectera automatiquement Angular** - cliquez sur "Deploy"
6. **C'est tout !** Chaque push sur votre branche principale déclenchera un nouveau déploiement

---

## Option 2 : Netlify (Aussi Simple)

### Via l'interface web (Recommandé)

1. **Allez sur [netlify.com](https://netlify.com)** et créez un compte
2. **Connectez votre repository GitHub**
3. **Configurez le build** :
   - Build command : `npm run build:prod`
   - Publish directory : `dist/angular-document-extractor`
4. **Cliquez sur "Deploy"**

C'est tout ! Votre application est en ligne.

### Via CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
npm run build:prod
netlify deploy --prod --dir=dist/angular-document-extractor
```

---

## ⚙️ Configuration Importante

### Avant de déployer, mettez à jour l'URL du webhook

Ouvrez `src/angular-service-example.ts` et modifiez l'URL du webhook pour la production :

```typescript
private readonly webhookUrl = 'https://softservtech.app.n8n.cloud/webhook-test/extract-documents';
```

Assurez-vous que cette URL est accessible depuis Internet et que CORS est configuré correctement.

---

## 🎯 Résultat

Après le déploiement, vous obtiendrez :
- ✅ Une URL publique (ex: `https://votre-app.vercel.app`)
- ✅ HTTPS automatique
- ✅ CDN global pour des performances optimales
- ✅ Déploiement automatique à chaque push (si configuré)

---

## 📝 Checklist Rapide

- [ ] Code poussé sur GitHub (optionnel mais recommandé)
- [ ] URL du webhook n8n mise à jour pour la production
- [ ] Build testé localement (`npm run build:prod`)
- [ ] Déploiement effectué
- [ ] Application testée en ligne

---

## 🆘 Besoin d'aide ?

Consultez le guide complet dans `DEPLOIEMENT.md` pour plus d'options et de détails.
