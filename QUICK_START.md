# 🚀 Guide de Démarrage Rapide

## Installation Rapide (5 minutes)

### 1. Prérequis
- ✅ n8n installé et accessible
- ✅ Compte Google Drive avec un dossier "scans"
- ✅ Clé API OpenAI (GPT-4 Vision)

### 2. Configuration des Credentials

#### Google Drive
```
Settings > Credentials > Add Credential
→ Google Drive OAuth2 API
→ Connect my account
→ Autoriser l'accès
```

#### OpenAI
```
Settings > Credentials > Add Credential
→ OpenAI
→ Entrer votre API Key
```

### 3. Import du Workflow

```
Workflows > Add workflow > Import from File
→ Sélectionner workflow-document-extraction.n8n.json
```

### 4. Configuration des Nodes

1. **Lister fichiers Google Drive** → Sélectionner votre credential Google Drive
2. **Télécharger fichier** → Sélectionner votre credential Google Drive
3. **Supprimer fichier traité** → Sélectionner votre credential Google Drive
4. **Extraction IA** → Sélectionner votre credential OpenAI

### 5. Activer et Tester

1. Activer le workflow (bascule ON)
2. Copier l'URL du webhook
3. Placer un fichier de test dans Google Drive "scans"
4. Appeler l'URL du webhook (GET)

## 📝 Structure des Fichiers

```
.
├── workflow-document-extraction.n8n.json  # Workflow n8n principal
├── README.md                              # Documentation complète
├── CONFIGURATION.md                       # Guide de configuration détaillé
├── QUICK_START.md                         # Ce fichier
├── angular-service-example.ts             # Service Angular d'exemple
└── angular-component-example.ts           # Component Angular d'exemple
```

## 🔄 Utilisation depuis Angular

### Étape 1 : Ajouter le service

```typescript
// Copier angular-service-example.ts dans votre projet Angular
// Adapter le chemin d'import dans votre module/standalone component
```

### Étape 2 : Utiliser le service

```typescript
import { DocumentExtractionService } from './document-extraction.service';

constructor(private extractionService: DocumentExtractionService) {}

extractDocuments() {
  this.extractionService.extractDocuments().subscribe({
    next: (response) => {
      console.log('Documents extraits:', response);
      // Traiter les données
    },
    error: (error) => {
      console.error('Erreur:', error);
    }
  });
}
```

### Étape 3 : Configurer l'URL du webhook

Dans `angular-service-example.ts`, modifier :
```typescript
private readonly webhookUrl = 'https://votre-instance-n8n.com/webhook/extract-documents';
```

## ⚡ Test Rapide

### Via Navigateur
```
https://votre-instance-n8n.com/webhook/extract-documents
```

### Via cURL
```bash
curl https://votre-instance-n8n.com/webhook/extract-documents
```

### Via Angular
```typescript
// Voir angular-service-example.ts
```

## 🎯 Format de Réponse Attendue

```json
{
  "status": "success",
  "total_documents": 1,
  "documents": [
    {
      "filename": "document.pdf",
      "status": "extracted",
      "data": {
        "prenom": "Jean",
        "nom": "Dupont",
        "date_naissance": "15/03/1985",
        "fonction": "Ingénieur",
        "date_embauche": "10/01/2020",
        "societe": "ABC Corp",
        "salaire_brut": "3 500 000",
        "impots": "450 000",
        "cotisations_sociales": "50 000",
        "salaire_net": "3 000 000"
      },
      "errors": []
    }
  ]
}
```

## ⚠️ Points Importants

1. **Un document à la fois** : Le workflow traite un seul document par appel webhook
2. **Suppression automatique** : Les fichiers sont supprimés après traitement
3. **Format dates** : JJ/MM/AAAA (format français)
4. **Monnaie** : CFA, format "3 500 000" (avec espaces)
5. **Confidence** : Chaque champ a un score de confiance (0-1)

## 🐛 Problèmes Fréquents

### Aucun fichier trouvé
→ Vérifier que le dossier "scans" existe dans Google Drive

### Erreur OpenAI
→ Vérifier que votre clé API est valide et a accès à GPT-4 Vision

### Fichier non supprimé
→ Normal si erreur de permission, le traitement continue

### Format de date incorrect
→ Vérifier le prompt dans le node OpenAI

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **README.md** : Documentation complète du workflow
- **CONFIGURATION.md** : Guide de configuration détaillé
- **angular-component-example.ts** : Exemple complet d'interface Angular

## 🆘 Support

1. Vérifier les logs d'exécution dans n8n
2. Tester avec un document simple
3. Vérifier toutes les credentials
4. Consulter la documentation n8n
