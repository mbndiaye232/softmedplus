# Changelog - Mise à jour du Workflow n8n

## 📋 Résumé des modifications

Ce workflow n8n a été créé/mis à jour pour traiter des documents scannés depuis Google Drive et extraire des données structurées avec un agent IA.

## ✨ Fonctionnalités implémentées

### 1. Traitement document unique
- ✅ Le workflow traite **un seul document à la fois** (le premier disponible)
- ✅ Chaque appel webhook traite un document, puis le supprime automatiquement
- ✅ Permet de traiter des milliers de documents de manière séquentielle

### 2. Extraction de données avec IA
- ✅ Utilisation de GPT-4 Vision (gpt-4o) pour extraire les données
- ✅ Support des formats : PDF (scans), PNG, JPG
- ✅ Gestion des documents de mauvaise qualité (froissés, inclinés, manuscrits)
- ✅ Spécifique aux documents français du Congo

### 3. Structure de données complète
Chaque champ extrait contient :
- ✅ **value** : La valeur extraite (ou "illisible")
- ✅ **confidence** : Niveau de confiance (0.0 à 1.0)
- ✅ **justification** : Justification courte (1 phrase max)

### 4. Champs extraits
- ✅ Prénom
- ✅ Nom
- ✅ Date de naissance (format JJ/MM/AAAA)
- ✅ Fonction
- ✅ Date d'embauche (format JJ/MM/AAAA)
- ✅ Société
- ✅ Salaire brut (CFA, format "3 500 000")
- ✅ Impôts (CFA, format "450 000")
- ✅ Cotisations sociales (CFA, format "50 000")
- ✅ Salaire net (CFA, format "3 000 000")

### 5. Webhook public
- ✅ Webhook configuré comme **public** pour faciliter l'intégration
- ✅ Méthode : GET
- ✅ URL : `/webhook/extract-document`
- ✅ Retourne un JSON avec les données extraites

### 6. Suppression automatique
- ✅ Les fichiers sont **automatiquement supprimés** de Google Drive après traitement
- ✅ Gestion d'erreur : continue même si la suppression échoue

### 7. Gestion des erreurs
- ✅ Statuts : `extracted`, `partial`, `failed`
- ✅ Tableau d'erreurs détaillé pour chaque document
- ✅ Gestion des valeurs illisibles avec estimation

## 📁 Fichiers modifiés/créés

### 1. `workflow-document-extraction.n8n.json`
- Workflow n8n complet avec tous les nodes nécessaires
- Configuration Google Drive (dossier "scans")
- Configuration OpenAI (GPT-4 Vision)
- Webhook public configuré
- Suppression automatique des fichiers

### 2. `angular-service-example.ts`
- ✅ Interfaces mises à jour pour gérer la structure `ExtractedField`
- ✅ Méthodes pour extraire value, confidence, justification
- ✅ Calcul de la confiance moyenne
- ✅ Support du format JJ/MM/AAAA pour les dates
- ✅ Support du format CFA pour les montants

### 3. `angular-component-example.ts`
- ✅ Template mis à jour pour afficher value, confidence et justification
- ✅ Indicateurs visuels pour les champs à faible confiance
- ✅ Affichage de la confiance moyenne
- ✅ Format JJ/MM/AAAA pour les dates

### 4. Documentation
- ✅ `CONFIGURATION.md` : Guide de configuration mis à jour
- ✅ `WORKFLOW_EXPLANATION.md` : Explication du workflow mise à jour
- ✅ `CHANGELOG.md` : Ce fichier

## 🔧 Configuration requise

1. **n8n** (self-hosted ou cloud)
2. **Google Drive** avec dossier "scans"
3. **OpenAI API Key** avec accès à GPT-4 Vision
4. **Angular** (pour l'application frontend)

## 📝 Notes importantes

### Format de dates
- Format : **JJ/MM/AAAA** (exemple: 15/03/1985)
- Conforme à la mémoire utilisateur : format DD/MM/YYYY (JJ/MM/AAAA)

### Format de monnaie
- Monnaie : **CFA** (Franc CFA)
- Format : Chiffres avec espaces pour milliers (exemple: "3 500 000")
- Pas de symbole CFA dans les valeurs

### Gestion des documents illisibles
- Si un champ est illisible : `value: "illisible"`, `confidence: 0.0`
- Si un champ est partiellement lisible : `value: "estimation"`, `confidence: < 0.7`
- Une justification est toujours fournie

### Exemple de réponse JSON

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
        ...
      },
      "errors": []
    }
  ]
}
```

## 🚀 Prochaines étapes

1. Importer le workflow dans n8n
2. Configurer les credentials (Google Drive, OpenAI)
3. Créer le dossier "scans" dans Google Drive
4. Placer des documents de test
5. Tester le webhook depuis l'application Angular
6. Vérifier que les documents sont bien supprimés après traitement

## 📞 Support

Pour toute question, consultez :
- `CONFIGURATION.md` : Guide de configuration détaillé
- `WORKFLOW_EXPLANATION.md` : Explication complète du workflow
- Documentation n8n : https://docs.n8n.io
- Documentation OpenAI : https://platform.openai.com/docs

