# 🚀 Guide de Démarrage - Application Angular

Ce guide vous explique comment exécuter l'application Angular pour afficher le formulaire d'extraction de documents.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (généralement inclus avec Node.js)

Pour vérifier vos installations :
```bash
node --version
npm --version
```

## 🔧 Installation

### 1. Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

Cette commande va installer toutes les dépendances Angular nécessaires (cela peut prendre quelques minutes).

## ▶️ Exécution de l'application

### Démarrage du serveur de développement

Une fois les dépendances installées, lancez l'application avec :

```bash
npm start
```

ou

```bash
ng serve
```

L'application va démarrer et vous verrez un message similaire à :

```
✔ Browser application bundle generation complete.
Initial Chunk Files | Names         |  Size
main.js             | main          | XXX kB

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

### Accéder à l'application

Ouvrez votre navigateur et allez à l'adresse :

**http://localhost:4200**

Vous devriez voir l'interface avec le bouton "🔍 Extraire les documents" et le formulaire.

## ⚙️ Configuration du Webhook n8n

⚠️ **Important** : Avant d'utiliser l'application, vous devez configurer l'URL du webhook n8n.

1. Ouvrez le fichier `src/angular-service-example.ts`
2. Trouvez la ligne avec `webhookUrl` (ligne 62)
3. Remplacez `'https://votre-instance-n8n.com/webhook/extract-documents'` par votre URL de webhook n8n réelle

Exemple :
```typescript
private readonly webhookUrl = 'https://mon-n8n.example.com/webhook/extract-documents';
```

## 📝 Utilisation

1. **Cliquez sur "🔍 Extraire les documents"** pour déclencher l'extraction
2. Les documents extraits s'afficheront avec leurs données
3. **Cliquez sur "Remplir le formulaire"** sur un document pour pré-remplir le formulaire
4. **Modifiez les données** si nécessaire dans le formulaire
5. **Cliquez sur "Enregistrer"** pour soumettre le formulaire

## 🛠️ Commandes disponibles

- `npm start` ou `ng serve` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run watch` - Compile en mode watch (recompilation automatique)

## 🐛 Résolution de problèmes

### Erreur "Cannot find module"
Si vous obtenez une erreur de module non trouvé :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 4200 déjà utilisé
Si le port 4200 est déjà utilisé, Angular vous proposera d'utiliser un autre port (par exemple 4201).

### Erreur CORS
Si vous obtenez des erreurs CORS lors de l'appel au webhook n8n, assurez-vous que votre instance n8n autorise les requêtes depuis `http://localhost:4200`.

## 📚 Structure du projet

```
.
├── src/
│   ├── angular-component-example.ts  # Composant principal avec le formulaire
│   ├── angular-service-example.ts     # Service pour appeler le webhook n8n
│   ├── app.component.ts               # Composant racine de l'application
│   ├── main.ts                        # Point d'entrée de l'application
│   └── index.html                     # Page HTML principale
├── package.json                        # Dépendances du projet
├── tsconfig.json                      # Configuration TypeScript
└── angular.json                       # Configuration Angular
```

## 🎯 Prochaines étapes

1. Configurez votre URL de webhook n8n dans `src/angular-service-example.ts`
2. Testez l'extraction avec un document dans votre Google Drive "scans"
3. Personnalisez le formulaire selon vos besoins
4. Ajoutez la logique de sauvegarde dans la méthode `onSubmit()` du composant

## 💡 Astuce

Pour voir les données extraites dans la console du navigateur, ouvrez les outils de développement (F12) et allez dans l'onglet "Console".
