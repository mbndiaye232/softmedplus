import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Interface pour un champ extrait avec ses métadonnées
 */
export interface ExtractedField {
  value: string | null;
  confidence: number;
  justification: string;
}

/**
 * Interface pour les données extraites d'un document
 * Chaque champ contient value, confidence et justification
 */
export interface ExtractedDocumentData {
  prenom: ExtractedField;
  nom: ExtractedField;
  date_naissance: ExtractedField;
  fonction: ExtractedField;
  date_embauche: ExtractedField;
  societe: ExtractedField;
  salaire_brut: ExtractedField;
  impots: ExtractedField;
  cotisations_sociales: ExtractedField;
  salaire_net: ExtractedField;
}

/**
 * Interface pour un document extrait avec ses métadonnées
 */
export interface ExtractedDocument {
  filename: string;
  status: 'extracted' | 'partial' | 'failed';
  data: ExtractedDocumentData;
  errors: string[];
}

/**
 * Interface pour la réponse complète de l'API n8n
 */
export interface ExtractionResponse {
  status: string;
  total_documents: number;
  documents: ExtractedDocument[];
  message?: string;
}

/**
 * Service Angular pour interagir avec le workflow n8n d'extraction de documents
 */
@Injectable({
  providedIn: 'root'
})
export class DocumentExtractionService {
  // URL du webhook n8n - À configurer selon votre instance
  // Note: Le webhook traite un seul document à la fois
  private readonly webhookUrl = 'https://softservtech.app.n8n.cloud/webhook-test/extract-documents';

  constructor(private http: HttpClient) {}

  /**
   * Déclenche l'extraction d'un document dans le dossier scans
   * Le webhook traite un seul document à la fois (le premier disponible)
   * Après traitement, le document est automatiquement supprimé de Google Drive
   * @returns Observable de la réponse d'extraction
   */
  extractDocuments(): Observable<ExtractionResponse> {
    return this.http.get<ExtractionResponse>(this.webhookUrl).pipe(
      map(response => {
        // Validation de la réponse
        if (!response || !response.documents) {
          throw new Error('Réponse invalide du serveur');
        }
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de l\'extraction des documents:', error);
        return throwError(() => new Error('Impossible d\'extraire les documents. Veuillez réessayer.'));
      })
    );
  }

  /**
   * Vérifie s'il reste des documents à traiter
   * @returns Observable indiquant si des documents sont disponibles
   */
  hasMoreDocuments(): Observable<boolean> {
    return this.extractDocuments().pipe(
      map(response => {
        // Si total_documents > 0, il y a encore des documents
        // Mais on a déjà traité un document, donc on doit vérifier s'il en reste
        // Pour cela, on appelle extractDocuments() qui va traiter le suivant
        // Si on obtient total_documents: 0, c'est qu'il n'y en a plus
        return response.total_documents > 0;
      }),
      catchError(() => {
        // En cas d'erreur, on suppose qu'il n'y a plus de documents
        return [false];
      })
    );
  }

  /**
   * Récupère les documents avec un statut spécifique
   * @param status - Statut à filtrer
   * @returns Observable des documents filtrés
   */
  getDocumentsByStatus(status: 'extracted' | 'partial' | 'failed'): Observable<ExtractedDocument[]> {
    return this.extractDocuments().pipe(
      map(response => response.documents.filter(doc => doc.status === status))
    );
  }

  /**
   * Formate les données d'un document pour un formulaire Angular
   * Extrait les valeurs des champs (value) pour remplir le formulaire
   * @param document - Document extrait
   * @returns Objet formaté pour formulaire avec les valeurs simplifiées
   */
  formatForForm(document: ExtractedDocument): any {
    const data = document.data;
    return {
      // Extraire les valeurs des champs
      prenom: data.prenom?.value || null,
      nom: data.nom?.value || null,
      date_naissance: data.date_naissance?.value || null,
      fonction: data.fonction?.value || null,
      date_embauche: data.date_embauche?.value || null,
      societe: data.societe?.value || null,
      salaire_brut: data.salaire_brut?.value || null,
      impots: data.impots?.value || null,
      cotisations_sociales: data.cotisations_sociales?.value || null,
      salaire_net: data.salaire_net?.value || null,
      // Conversion des dates pour les inputs de type date (si nécessaire)
      date_naissance_formatted: this.parseFrenchDate(data.date_naissance?.value || null),
      date_embauche_formatted: this.parseFrenchDate(data.date_embauche?.value || null),
      // Conversion des montants en nombres (enlever les espaces)
      salaire_brut_numeric: this.parseAmount(data.salaire_brut?.value || null),
      impots_numeric: this.parseAmount(data.impots?.value || null),
      cotisations_sociales_numeric: this.parseAmount(data.cotisations_sociales?.value || null),
      salaire_net_numeric: this.parseAmount(data.salaire_net?.value || null)
    };
  }

  /**
   * Récupère la valeur d'un champ extrait
   * @param field - Champ extrait
   * @returns La valeur du champ ou null
   */
  getFieldValue(field: ExtractedField | undefined): string | null {
    return field?.value || null;
  }

  /**
   * Récupère la confiance d'un champ extrait
   * @param field - Champ extrait
   * @returns La confiance du champ (0-1) ou 0
   */
  getFieldConfidence(field: ExtractedField | undefined): number {
    return field?.confidence || 0;
  }

  /**
   * Vérifie si un champ est fiable (confidence > 0.7)
   * @param field - Champ extrait
   * @returns true si le champ est fiable
   */
  isFieldReliable(field: ExtractedField | undefined): boolean {
    return (field?.confidence || 0) > 0.7;
  }

  /**
   * Parse une date au format JJ/MM/AAAA vers un format utilisable
   * @param dateStr - Date au format JJ/MM/AAAA
   * @returns Date au format YYYY-MM-DD pour les inputs HTML ou null
   */
  private parseFrenchDate(dateStr: string | null): string | null {
    if (!dateStr || dateStr === 'illisible') {
      return null;
    }
    
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return null;
  }

  /**
   * Parse un montant CFA (format "3 500 000") vers un nombre
   * @param amountStr - Montant au format string avec espaces
   * @returns Nombre ou null
   */
  private parseAmount(amountStr: string | null): number | null {
    if (!amountStr || amountStr === 'illisible') {
      return null;
    }
    
    const cleanAmount = amountStr.replace(/\s/g, '');
    const amount = parseFloat(cleanAmount);
    return isNaN(amount) ? null : amount;
  }

  /**
   * Valide si un document est complet (pas d'erreurs)
   * @param document - Document à valider
   * @returns true si le document est complet
   */
  isDocumentComplete(document: ExtractedDocument): boolean {
    return document.status === 'extracted' && document.errors.length === 0;
  }

  /**
   * Récupère le taux de complétude d'un document
   * @param document - Document à analyser
   * @returns Pourcentage de champs remplis (0-100)
   */
  getCompletenessPercentage(document: ExtractedDocument): number {
    const fields = Object.values(document.data) as ExtractedField[];
    const filledFields = fields.filter(field => {
      const value = field?.value;
      return value !== null && value !== undefined && value !== 'illisible' && value !== '';
    }).length;
    return Math.round((filledFields / fields.length) * 100);
  }

  /**
   * Récupère le taux de confiance moyen d'un document
   * @param document - Document à analyser
   * @returns Pourcentage de confiance moyen (0-100)
   */
  getAverageConfidence(document: ExtractedDocument): number {
    const fields = Object.values(document.data) as ExtractedField[];
    const validFields = fields.filter(field => {
      const value = field?.value;
      return value !== null && value !== undefined && value !== 'illisible' && value !== '';
    });
    
    if (validFields.length === 0) {
      return 0;
    }
    
    const totalConfidence = validFields.reduce((sum, field) => sum + (field?.confidence || 0), 0);
    return Math.round((totalConfidence / validFields.length) * 100);
  }
}
