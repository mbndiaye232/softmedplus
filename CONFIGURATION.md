# Guide de Configuration du Workflow n8n

## 📋 Prérequis

1. Un compte n8n (self-hosted ou cloud)
2. Un compte Google Drive avec un dossier "scans"
3. Une clé API OpenAI (pour GPT-4 Vision)

## 🔧 Configuration Étape par Étape

### Étape 1 : Configurer Google Drive OAuth2

1. Dans n8n, allez dans **Settings** > **Credentials**
2. Cliquez sur **Add Credential**
3. Recherchez **Google Drive OAuth2 API**
4. Cliquez sur **Create**
5. Suivez le processus OAuth2 :
   - Cliquez sur **Connect my account**
   - Autorisez l'accès à Google Drive
   - Sélectionnez les scopes nécessaires :
     - `https://www.googleapis.com/auth/drive.readonly`
     - `https://www.googleapis.com/auth/drive.file`
6. Notez l'**ID de la credential** (ex: "1")

### Étape 2 : Créer le dossier Google Drive "scans"

1. Connectez-vous à votre Google Drive
2. Créez un nouveau dossier nommé exactement **"scans"**
3. Si vous voulez utiliser un dossier existant avec un nom différent :
   - Cliquez droit sur le dossier > **Partager** > Obtenez le **Folder ID** dans l'URL
   - Notez cet ID pour l'étape suivante

### Étape 3 : Configurer OpenAI API

1. Dans n8n, allez dans **Settings** > **Credentials**
2. Cliquez sur **Add Credential**
3. Recherchez **OpenAI**
4. Cliquez sur **Create**
5. Entrez votre **API Key** OpenAI
6. Notez l'**ID de la credential** (ex: "2")

> **Note** : Assurez-vous que votre compte OpenAI a accès à GPT-4 Vision (gpt-4o)

### Étape 4 : Importer le Workflow

1. Dans n8n, allez dans **Workflows**
2. Cliquez sur **Add workflow** > **Import from File**
3. Sélectionnez le fichier `workflow-document-extraction.n8n.json`
4. Le workflow sera importé

### Étape 5 : Configurer les Credentials dans le Workflow

Après l'import, vous devez mettre à jour les IDs des credentials :

#### Node "Lister fichiers Google Drive"
1. Double-cliquez sur le node
2. Dans **Credential to connect with**, sélectionnez votre credential Google Drive
3. Si vous utilisez un dossier différent de "scans" :
   - Dans **Folder ID**, entrez l'ID de votre dossier (ou utilisez le sélecteur de dossier)

#### Node "Télécharger fichier"
1. Double-cliquez sur le node
2. Dans **Credential to connect with**, sélectionnez votre credential Google Drive

#### Node "Supprimer fichier traité"
1. Double-cliquez sur le node
2. Dans **Credential to connect with**, sélectionnez votre credential Google Drive

#### Node "Extraction IA avec GPT-4 Vision"
1. Double-cliquez sur le node
2. Dans **Credential to connect with**, sélectionnez votre credential OpenAI
3. Vérifiez que le modèle est `gpt-4o` (ou `gpt-4-vision-preview` si nécessaire)

### Étape 6 : Configurer le Webhook

1. Le webhook est déjà configuré dans le workflow comme **public**
2. Activez le workflow (basculez **Active** à ON)
3. Copiez l'URL du webhook qui apparaît sous le node "Webhook - Déclenchement manuel"
4. L'URL ressemble à : `https://votre-instance-n8n.com/webhook/extract-document`
5. **Important** : Le webhook traite **un seul document à la fois** (le premier disponible dans le dossier)
6. Après traitement, le document est **automatiquement supprimé** du dossier Google Drive

### Étape 7 : Tester le Workflow

1. Placez un ou plusieurs fichiers de test dans votre dossier Google Drive "scans"
   - Format supporté : PDF (scans), PNG, JPG
   - Les documents peuvent être de mauvaise qualité (froissés, inclinés, manuscrits)
2. Appelez l'URL du webhook (GET) depuis votre navigateur, Postman ou votre application Angular
3. Le workflow devrait :
   - Lister les fichiers dans le dossier "scans"
   - Prendre le **premier document** disponible
   - Télécharger le fichier
   - Extraire les données via IA (GPT-4 Vision)
   - **Supprimer automatiquement** le fichier de Google Drive
   - Retourner le JSON avec les données extraites (incluant confidence et justification pour chaque champ)

#### Exemple de réponse JSON

```json
{
  "status": "success",
  "total_documents": 1,
  "documents": [
    {
      "filename": "doc1.pdf",
      "status": "extracted",
      "data": {
        "prenom": {
          "value": "Jean",
          "confidence": 0.95,
          "justification": "Nom clairement visible dans le document"
        },
        "nom": {
          "value": "Dupont",
          "confidence": 0.98,
          "justification": "Nom lisible dans la section identité"
        },
        "date_naissance": {
          "value": "15/03/1985",
          "confidence": 0.92,
          "justification": "Date formatée correctement au format JJ/MM/AAAA"
        },
        "fonction": {
          "value": "Ingénieur",
          "confidence": 0.90,
          "justification": "Fonction visible dans la section professionnelle"
        },
        "date_embauche": {
          "value": "10/01/2020",
          "confidence": 0.88,
          "justification": "Date d'embauche lisible dans le contrat"
        },
        "societe": {
          "value": "ABC Corp",
          "confidence": 0.95,
          "justification": "Nom de société clairement visible"
        },
        "salaire_brut": {
          "value": "3 500 000",
          "confidence": 0.85,
          "justification": "Montant lisible avec espaces pour milliers"
        },
        "impots": {
          "value": "450 000",
          "confidence": 0.90,
          "justification": "Montant d'impôts visible dans la fiche de paie"
        },
        "cotisations_sociales": {
          "value": "50 000",
          "confidence": 0.88,
          "justification": "Cotisations sociales listées clairement"
        },
        "salaire_net": {
          "value": "3 000 000",
          "confidence": 0.92,
          "justification": "Salaire net calculé et visible"
        }
      },
      "errors": []
    }
  ]
}
```

#### Exemple de réponse avec erreur

```json
{
  "status": "success",
  "total_documents": 1,
  "documents": [
    {
      "filename": "doc2.jpg",
      "status": "partial",
      "data": {
        "prenom": {
          "value": "Marie",
          "confidence": 0.90,
          "justification": "Prénom clairement lisible"
        },
        "nom": {
          "value": "Martin",
          "confidence": 0.95,
          "justification": "Nom visible dans le document"
        },
        "date_naissance": {
          "value": "illisible",
          "confidence": 0.0,
          "justification": "Zone de date floue et partiellement masquée"
        },
        ...
      },
      "errors": [
        "date_naissance: illisible"
      ]
    }
  ]
}
```

## 🔍 Dépannage

### Erreur : "No files found in folder"
- Vérifiez que le dossier "scans" existe dans Google Drive
- Vérifiez que les fichiers sont bien des PDF, PNG ou JPG
- Vérifiez que la credential Google Drive a les bonnes permissions

### Erreur : "OpenAI API error"
- Vérifiez que votre clé API OpenAI est valide
- Vérifiez que votre compte a accès à GPT-4 Vision
- Vérifiez que vous avez des crédits suffisants sur OpenAI

### Erreur : "Cannot delete file"
- Le workflow continue même si la suppression échoue (grâce à `continueOnFail: true`)
- Vérifiez les permissions du fichier dans Google Drive
- Le fichier sera quand même traité

### Le workflow ne traite qu'un seul document
- C'est normal ! Le workflow est configuré pour traiter **un document à la fois** (le premier disponible)
- Après le traitement, le document est **supprimé** automatiquement du dossier Google Drive
- Vous devez rappeler le webhook pour traiter le document suivant
- Cela permet un meilleur contrôle, évite les timeouts et garantit le traitement séquentiel de milliers de documents

### Les dates ne sont pas au bon format
- Vérifiez que le prompt système dans le node OpenAI mentionne bien "JJ/MM/AAAA"
- Vérifiez que les documents sont en français

### Les montants ne sont pas corrects
- Vérifiez que le prompt mentionne bien "CFA" et "chiffres avec espaces"
- Les montants doivent être au format "3 500 000" (sans symbole CFA)

## 🎛️ Personnalisations Avancées

### Traiter plusieurs documents en une fois

Si vous voulez traiter plusieurs documents en parallèle (attention aux limites de rate limiting) :

1. Modifiez le node "Prendre 1 document à la fois"
2. Changez `batchSize` de `1` à `5` (par exemple)
3. ⚠️ Attention : cela peut augmenter les coûts OpenAI et les risques de timeout

### Changer le dossier Google Drive

1. Dans le node "Lister fichiers Google Drive"
2. Utilisez le sélecteur de dossier ou entrez manuellement l'ID du dossier

### Utiliser un autre modèle IA

1. Dans le node "Extraction IA avec GPT-4 Vision"
2. Changez le modèle :
   - `gpt-4o` (recommandé, meilleure qualité)
   - `gpt-4-vision-preview` (alternative)
   - `gpt-4-turbo` (si disponible)

### Modifier le prompt d'extraction

1. Dans le node "Extraction IA avec GPT-4 Vision"
2. Modifiez le contenu du message système ou utilisateur
3. Assurez-vous de maintenir la structure JSON demandée

### Désactiver la suppression automatique

1. Dans le node "Supprimer fichier traité"
2. Désactivez le node (basculez OFF) ou supprimez-le du workflow
3. Les fichiers resteront dans Google Drive après traitement

## 📊 Monitoring

Pour surveiller les exécutions :

1. Allez dans **Executions** dans n8n
2. Consultez les logs de chaque exécution
3. Vérifiez les erreurs éventuelles
4. Analysez les temps d'exécution

## 🔒 Sécurité

### Rendre le webhook privé (optionnel)

Par défaut, le webhook est **public** pour faciliter l'intégration. Pour le sécuriser :

1. Dans le node "Webhook - Déclenchement manuel", décochez **Public**
2. Ajoutez une authentification (Basic Auth, Header Auth, etc.)
3. Utilisez un token ou une API key
4. Configurez votre application Angular pour envoyer les credentials avec chaque requête

### Limiter les accès Google Drive

1. Créez un compte Google Drive dédié uniquement pour ce workflow
2. Partagez uniquement le dossier "scans" avec ce compte
3. Utilisez des credentials OAuth2 spécifiques

## 💰 Coûts

### Estimation des coûts OpenAI

- GPT-4 Vision : ~$0.01 par image (1024x1024)
- Pour 1000 documents : ~$10-20 selon la complexité

### Recommandations

- Traitez les documents par petits lots
- Surveillez votre consommation OpenAI
- Utilisez un modèle moins cher si la qualité est suffisante

## 📞 Support

Pour toute question :
1. Vérifiez les logs d'exécution dans n8n
2. Vérifiez que toutes les credentials sont correctement configurées
3. Testez avec un document simple en premier
4. Consultez la documentation n8n : https://docs.n8n.io
