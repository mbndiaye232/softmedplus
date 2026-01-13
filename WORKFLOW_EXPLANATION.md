# 📖 Explication du Workflow n8n

## 🎯 Objectif

Ce workflow n8n automatise l'extraction de données structurées depuis des documents scannés stockés dans Google Drive. Il traite les documents un par un et retourne les données extraites via un webhook.

## 🔄 Flux du Workflow

### 1. **Webhook - Déclenchement manuel**
- **Type** : Webhook **public** (GET)
- **URL** : `/extract-document`
- **Rôle** : Point d'entrée déclenché manuellement depuis l'application Angular
- **Retour** : JSON avec les données extraites d'un seul document
- **Comportement** : Traite **un seul document** par appel (le premier disponible)

### 2. **Lister fichiers Google Drive**
- **Action** : Liste tous les fichiers du dossier "scans"
- **Filtre** : Récupère uniquement les métadonnées (id, name, mimeType)
- **Résultat** : Liste des fichiers à traiter

### 3. **Filtrer PDF/PNG/JPG**
- **Action** : Filtre les fichiers pour ne garder que :
  - PDF (`application/pdf`)
  - PNG (`image/png`)
  - JPG (`image/jpeg`)
- **Résultat** : Liste filtrée des fichiers supportés

### 4. **Prendre le premier document**
- **Action** : Sélectionne le premier document disponible dans la liste filtrée
- **Rôle** : Garantit le traitement d'un seul document par appel webhook
- **Comportement** : 
  - Si aucun document n'est disponible, retourne un message d'erreur
  - Si un document est disponible, le transmet au workflow
  - Le document suivant sera pris lors du prochain appel webhook (après suppression)

### 4b. **Vérifier si document existe**
- **Action** : Vérifie qu'un document est disponible
- **Comportement** :
  - Si un document existe : continue le workflow
  - Si aucun document : retourne une réponse JSON indiquant qu'aucun document n'est disponible

### 5. **Télécharger fichier**
- **Action** : Télécharge le fichier depuis Google Drive
- **Format** : Binaire (PDF, PNG, JPG)
- **Résultat** : Fichier prêt pour traitement

### 6. **Préparer données pour OCR**
- **Action** : Prépare les données pour l'IA
  - Convertit le fichier en base64
  - Conserve le mimeType
  - Conserve le nom et l'ID du fichier
- **Résultat** : Données formatées pour GPT-4 Vision

### 7. **Extraction IA avec GPT-4 Vision**
- **Modèle** : `gpt-4o` (GPT-4 Vision)
- **Action** : Analyse l'image et extrait les données structurées
- **Prompt** : Instructions détaillées pour extraire :
  - Prénom, Nom
  - Date de naissance (JJ/MM/AAAA)
  - Fonction
  - Date d'embauche (JJ/MM/AAAA)
  - Société
  - Salaire brut, Impôts, Cotisations sociales, Salaire net (CFA)
- **Format retour** : JSON avec structure `{champ: {value, confidence, justification}}`

### 8. **Formater réponse**
- **Action** : Transforme la réponse de l'IA en format standard
  - Parse le JSON de l'IA (gère les markdown code blocks)
  - Extrait les valeurs, confidences et justifications pour chaque champ
  - Détecte les erreurs et champs manquants
  - Détermine le statut (extracted/partial/failed)
- **Résultat** : Objet formaté avec :
  - `filename` : Nom du fichier
  - `fileId` : ID du fichier Google Drive (pour suppression)
  - `status` : Statut d'extraction (extracted/partial/failed)
  - `data` : Données extraites avec structure `{value, confidence, justification}` pour chaque champ
  - `errors` : Liste des erreurs détaillées

### 9. **Supprimer fichier traité**
- **Action** : Supprime **automatiquement** le fichier de Google Drive après traitement
- **Gestion d'erreur** : `continueOnFail: true` (continue même si erreur de suppression)
- **Résultat** : Fichier supprimé du dossier "scans" (ou erreur ignorée si échec)
- **Important** : La suppression se fait **après** l'extraction des données, garantissant que le document est traité avant d'être supprimé

### 10. **Construire réponse finale**
- **Action** : Construit le JSON final pour le webhook
- **Structure** :
  ```json
  {
    "status": "success",
    "total_documents": 1,
    "documents": [
      {
        "filename": "...",
        "status": "extracted|partial|failed",
        "data": {
          "champ": {
            "value": "...",
            "confidence": 0.0-1.0,
            "justification": "..."
          }
        },
        "errors": []
      }
    ]
  }
  ```

### 11. **Répondre au Webhook** (ou **Réponse aucun document**)
- **Action** : Retourne le JSON au client (Angular)
- **Format** : JSON standard HTTP avec Content-Type application/json
- **Cas 1** : Document traité → Retourne les données extraites
- **Cas 2** : Aucun document disponible → Retourne `total_documents: 0` avec message

## 🔁 Comportement "Un document à la fois"

Le workflow est configuré pour traiter **un seul document** par appel webhook :

1. **Premier appel** : 
   - Liste les fichiers du dossier "scans"
   - Filtre les fichiers supportés (PDF, PNG, JPG)
   - Prend le **premier document** disponible
   - Télécharge, extrait, puis **supprime** le fichier
   - Retourne les données extraites
2. **Appels suivants** : 
   - Répète le processus pour le document suivant (qui est maintenant le premier puisque le précédent a été supprimé)
   - Continue jusqu'à ce que tous les documents soient traités
3. **Tous traités** : Quand tous les documents sont traités, retourne `total_documents: 0` avec message

### Pourquoi ce comportement ?

- ✅ Évite les timeouts (traitement long, 15-40 secondes par document)
- ✅ Meilleur contrôle du processus pour des milliers de documents
- ✅ Facilite le debugging et le monitoring
- ✅ Gère mieux les erreurs individuelles (un document à la fois)
- ✅ Évite la surcharge de l'API OpenAI (rate limiting)
- ✅ Garantit que chaque document est traité même en cas d'erreur sur un autre
- ✅ Simplifie la gestion des retry et des erreurs

## 📊 Structure des Données

### Format de sortie

**Structure complète avec value/confidence/justification :**

```json
{
  "status": "success",
  "total_documents": 1,
  "documents": [
    {
      "filename": "document.pdf",
      "status": "extracted" | "partial" | "failed",
      "data": {
        "prenom": {
          "value": "Jean" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Justification courte (1 phrase max)"
        },
        "nom": {
          "value": "Dupont" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Nom clairement visible dans le document"
        },
        "date_naissance": {
          "value": "15/03/1985" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Date formatée correctement au format JJ/MM/AAAA"
        },
        "fonction": {
          "value": "Ingénieur" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Fonction visible dans la section professionnelle"
        },
        "date_embauche": {
          "value": "10/01/2020" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Date d'embauche lisible dans le contrat"
        },
        "societe": {
          "value": "ABC Corp" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Nom de société clairement visible"
        },
        "salaire_brut": {
          "value": "3 500 000" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Montant lisible avec espaces pour milliers"
        },
        "impots": {
          "value": "450 000" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Montant d'impôts visible dans la fiche de paie"
        },
        "cotisations_sociales": {
          "value": "50 000" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Cotisations sociales listées clairement"
        },
        "salaire_net": {
          "value": "3 000 000" | null | "illisible",
          "confidence": 0.0-1.0,
          "justification": "Salaire net calculé et visible"
        }
      },
      "errors": [
        "date_naissance: illisible",
        "salaire_brut: confidence trop faible (0.25)"
      ]
    }
  ]
}
```

**Cas : Aucun document disponible**

```json
{
  "status": "success",
  "total_documents": 0,
  "documents": [],
  "message": "Aucun document disponible dans le dossier scans"
}
```

### Statuts possibles

- **`extracted`** : Toutes les données ont été extraites avec succès (pas d'erreurs)
- **`partial`** : Certaines données ont été extraites (moins de 50% d'erreurs)
- **`failed`** : La majorité des données n'a pas pu être extraite (plus de 50% d'erreurs)

## 🎨 Personnalisation

### Changer le dossier Google Drive

Dans le node "Lister fichiers Google Drive" :
- Utilisez le sélecteur de dossier
- Ou entrez manuellement l'ID du dossier

### Modifier le modèle IA

Dans le node "Extraction IA" :
- `gpt-4o` : Modèle recommandé (meilleure qualité)
- `gpt-4-vision-preview` : Alternative
- `gpt-4-turbo` : Si disponible

### Ajuster le prompt d'extraction

Dans le node "Extraction IA", vous pouvez modifier :
- Le prompt système (instructions générales)
- Le prompt utilisateur (instructions spécifiques)
- Le format de réponse attendu

### Désactiver la suppression automatique

- Désactivez le node "Supprimer fichier traité"
- Ou supprimez-le du workflow
- Les fichiers resteront dans Google Drive

## 🔧 Améliorations Possibles

### 1. Traitement par lots

Pour traiter plusieurs documents en parallèle :
- Modifier `batchSize` dans "Split in Batches"
- Ajouter une gestion d'erreur améliorée

### 2. Retry automatique

En cas d'erreur OpenAI :
- Ajouter un node "Retry" avant "Extraction IA"
- Configurer 2-3 tentatives avec délai

### 3. Webhook sécurisé

Pour sécuriser le webhook :
- Ajouter un token dans le node webhook
- Vérifier le token dans Angular avant appel

### 4. Logging amélioré

Pour mieux tracer les exécutions :
- Ajouter des nodes "Log" aux étapes clés
- Enregistrer les résultats dans une base de données

### 5. Validation des données

Avant de retourner le JSON :
- Valider le format des dates
- Valider les montants (format CFA)
- Vérifier la cohérence des données

## 📈 Performance

### Temps d'exécution moyen

- **Lister fichiers** : ~1-2 secondes
- **Télécharger fichier** : ~2-5 secondes (selon taille)
- **Extraction IA** : ~10-30 secondes (selon complexité)
- **Formatage** : ~1 seconde
- **Suppression** : ~1 seconde

**Total** : ~15-40 secondes par document

### Coûts OpenAI

- **GPT-4 Vision** : ~$0.01 par image (1024x1024)
- **Pour 1000 documents** : ~$10-20

## 🐛 Gestion des Erreurs

Le workflow gère plusieurs types d'erreurs :

1. **Aucun fichier trouvé** : Retourne `total_documents: 0`
2. **Erreur de téléchargement** : Le workflow s'arrête, pas de suppression
3. **Erreur d'extraction IA** : Retourne `status: "failed"` avec erreurs
4. **Erreur de suppression** : Ignorée (`continueOnFail: true`), traitement continue
5. **Erreur de parsing JSON** : Ajoutée dans `errors[]`, statut "failed"

## 📚 Ressources

- Documentation n8n : https://docs.n8n.io
- OpenAI GPT-4 Vision : https://platform.openai.com/docs/guides/vision
- Google Drive API : https://developers.google.com/drive/api
