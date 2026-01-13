# Workflow n8n - Extraction de Données depuis Documents Scannés

Ce workflow n8n permet d'extraire automatiquement des informations structurées depuis des documents scannés (PDF, PNG, JPG) stockés dans Google Drive.

## 📋 Fonctionnalités

- ✅ Parcourt automatiquement le dossier Google Drive "scans"
- ✅ Traite un document à la fois (PDF, PNG, JPG)
- ✅ Extraction IA via GPT-4 Vision avec gestion de la qualité variable
- ✅ Gestion des incertitudes avec confidence scores
- ✅ Format de date JJ/MM/AAAA (format français)
- ✅ Monnaie CFA avec formatage approprié
- ✅ Suppression automatique des fichiers traités
- ✅ Retour JSON structuré avec gestion d'erreurs
- ✅ Webhook public pour déclenchement manuel

## 🔧 Configuration Requise

### 1. Credentials n8n

#### Google Drive OAuth2
1. Allez dans **Settings > Credentials** dans n8n
2. Créez une nouvelle credential de type **Google Drive OAuth2 API**
3. Suivez le processus OAuth2 pour autoriser l'accès au dossier "scans"
4. Notez l'ID de la credential créée

#### OpenAI API
1. Créez une credential de type **OpenAI API**
2. Entrez votre clé API OpenAI
3. Notez l'ID de la credential créée

### 2. Configuration Google Drive

1. Créez un dossier nommé **"scans"** dans votre Google Drive
2. Placez-y vos documents à traiter (PDF, PNG, JPG)
3. Vérifiez que le compte OAuth2 a accès à ce dossier

### 3. Import du Workflow

1. Dans n8n, allez dans **Workflows**
2. Cliquez sur **Import from File**
3. Sélectionnez le fichier `workflow-document-extraction.n8n.json`
4. Mettez à jour les IDs des credentials dans les nodes :
   - **Lister fichiers Google Drive** : ID credential Google Drive
   - **Télécharger fichier** : ID credential Google Drive
   - **Supprimer fichier traité** : ID credential Google Drive
   - **Extraction IA avec GPT-4 Vision** : ID credential OpenAI

### 4. Configuration du Webhook

Le webhook est configuré pour être **public** et utilisable en **GET** sur le chemin `/extract-documents`.

1. Activez le workflow
2. Copiez l'URL du webhook générée
3. Cette URL peut être appelée depuis votre application Angular

## 📊 Format de Réponse JSON

Le workflow retourne un JSON avec la structure suivante :

```json
{
  "status": "success",
  "total_documents": 2,
  "documents": [
    {
      "filename": "doc1.pdf",
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
    },
    {
      "filename": "doc2.jpg",
      "status": "partial",
      "data": {
        "prenom": "Marie",
        "nom": "Martin",
        "date_naissance": "illisible",
        "fonction": "Comptable",
        "date_embauche": "05/06/2019",
        "societe": "XYZ SARL",
        "salaire_brut": "2 800 000",
        "impots": "350 000",
        "cotisations_sociales": "45 000",
        "salaire_net": "2 405 000"
      },
      "errors": ["date_naissance: illisible (confidence: 0.2)"]
    }
  ]
}
```

### Statuts possibles
- `extracted` : Toutes les données ont été extraites avec succès
- `partial` : Certaines données sont manquantes ou incertaines
- `failed` : La majorité des données n'a pas pu être extraite

## 🔄 Flux du Workflow

1. **Webhook** - Déclenchement manuel via GET
2. **Lister fichiers** - Récupère la liste des fichiers du dossier "scans"
3. **Filtrer** - Ne garde que PDF, PNG, JPG
4. **Split in Batches** - Traite un document à la fois
5. **Télécharger** - Récupère le fichier depuis Google Drive
6. **Préparer données** - Convertit en base64 pour l'IA
7. **Extraction IA** - GPT-4 Vision extrait les données structurées
8. **Formater réponse** - Structure les données avec confidence et errors
9. **Supprimer fichier** - Supprime le fichier traité de Google Drive
10. **Accumuler résultats** - Collecte tous les résultats
11. **Construire réponse finale** - Formate le JSON final
12. **Répondre au Webhook** - Retourne le JSON au client

## 🎯 Utilisation depuis Angular

### Service Angular

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExtractedDocument {
  filename: string;
  status: 'extracted' | 'partial' | 'failed';
  data: {
    prenom: string | null;
    nom: string | null;
    date_naissance: string | null;
    fonction: string | null;
    date_embauche: string | null;
    societe: string | null;
    salaire_brut: string | null;
    impots: string | null;
    cotisations_sociales: string | null;
    salaire_net: string | null;
  };
  errors: string[];
}

export interface ExtractionResponse {
  status: string;
  total_documents: number;
  documents: ExtractedDocument[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentExtractionService {
  private webhookUrl = 'https://votre-n8n-instance.com/webhook/extract-documents';

  constructor(private http: HttpClient) {}

  extractDocuments(): Observable<ExtractionResponse> {
    return this.http.get<ExtractionResponse>(this.webhookUrl);
  }
}
```

### Component Angular

```typescript
import { Component } from '@angular/core';
import { DocumentExtractionService } from './document-extraction.service';

@Component({
  selector: 'app-document-extractor',
  template: `
    <button (click)="extractDocuments()" [disabled]="loading">
      {{ loading ? 'Extraction en cours...' : 'Extraire les documents' }}
    </button>
    
    <div *ngIf="results">
      <h3>Résultats ({{ results.total_documents }} documents)</h3>
      <div *ngFor="let doc of results.documents" class="document-result">
        <h4>{{ doc.filename }} - {{ doc.status }}</h4>
        <pre>{{ doc | json }}</pre>
        <div *ngIf="doc.errors.length > 0" class="errors">
          <strong>Erreurs:</strong>
          <ul>
            <li *ngFor="let error of doc.errors">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class DocumentExtractorComponent {
  loading = false;
  results: ExtractionResponse | null = null;

  constructor(private extractionService: DocumentExtractionService) {}

  extractDocuments() {
    this.loading = true;
    this.extractionService.extractDocuments().subscribe({
      next: (response) => {
        this.results = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur extraction:', error);
        this.loading = false;
      }
    });
  }
}
```

## ⚙️ Personnalisation

### Modifier le dossier Google Drive

Dans le node "Lister fichiers Google Drive", modifiez le paramètre `folderId` avec l'ID de votre dossier.

### Modifier le modèle IA

Dans le node "Extraction IA avec GPT-4 Vision", vous pouvez :
- Changer le modèle (actuellement `gpt-4o`)
- Ajuster `temperature` (0.1 pour plus de précision)
- Modifier `maxTokens` selon vos besoins

### Désactiver la suppression automatique

Dans le node "Supprimer fichier traité", désactivez-le ou supprimez-le du workflow si vous souhaitez conserver les fichiers.

## 🐛 Gestion des Erreurs

- Les erreurs de parsing JSON sont capturées et ajoutées au tableau `errors`
- Les champs illisibles sont marqués avec `confidence: 0.0`
- Les fichiers non supprimables continuent le traitement (grâce à `continueOnFail: true`)

## 📝 Notes Importantes

- **Format de date** : JJ/MM/AAAA (comme demandé)
- **Monnaie** : CFA, format avec espaces (ex: "3 500 000")
- **Confidence** : 0.0 à 1.0 pour chaque champ
- **Justification** : Une phrase explicative pour chaque extraction
- **Documents traités un par un** : Le workflow utilise `splitInBatches` avec `batchSize: 1`
- **Suppression automatique** : Les fichiers sont supprimés après traitement

## 🔒 Sécurité

⚠️ **Attention** : Le webhook est configuré comme **public**. Pour un environnement de production, considérez :
- Ajouter une authentification (token, API key)
- Limiter les IPs autorisées
- Ajouter un rate limiting

## 📞 Support

Pour toute question ou problème, vérifiez :
1. Les credentials Google Drive et OpenAI sont correctement configurés
2. Le dossier "scans" existe dans Google Drive
3. Les logs d'exécution dans n8n pour diagnostiquer les erreurs
