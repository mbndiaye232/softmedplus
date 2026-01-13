import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentExtractionService, ExtractedDocument, ExtractionResponse } from './angular-service-example';

/**
 * Component Angular pour gérer l'extraction et l'affichage des documents
 */
@Component({
  selector: 'app-document-extractor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="document-extractor-container">
      <h2>Extraction de Documents</h2>
      
      <!-- Bouton de déclenchement -->
      <div class="action-section">
        <button 
          (click)="extractDocuments()" 
          [disabled]="loading || extracting"
          class="btn btn-primary">
          <span *ngIf="!loading && !extracting">🔍 Extraire les documents</span>
          <span *ngIf="loading || extracting">⏳ Extraction en cours...</span>
        </button>
        
        <button 
          (click)="toggleForm()" 
          class="btn btn-secondary">
          <span *ngIf="!showForm">📝 Afficher le formulaire</span>
          <span *ngIf="showForm">✕ Masquer le formulaire</span>
        </button>
        
        <div *ngIf="lastExtractionTime" class="last-extraction">
          Dernière extraction : {{ lastExtractionTime | date:'dd/MM/yyyy HH:mm:ss' }}
        </div>
      </div>

      <!-- Messages d'erreur -->
      <div *ngIf="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>

      <!-- Résultats -->
      <div *ngIf="extractionResponse" class="results-section">
        <div class="summary">
          <h3>Résumé de l'extraction</h3>
          <div class="stats">
            <span class="stat-item">
              <strong>Total:</strong> {{ extractionResponse.total_documents }} documents
            </span>
            <span class="stat-item success">
              <strong>Complets:</strong> {{ getCompletedCount() }} documents
            </span>
            <span class="stat-item warning">
              <strong>Partiels:</strong> {{ getPartialCount() }} documents
            </span>
            <span class="stat-item error">
              <strong>Échoués:</strong> {{ getFailedCount() }} documents
            </span>
          </div>
        </div>

        <!-- Liste des documents -->
        <div class="documents-list">
          <div 
            *ngFor="let doc of extractionResponse.documents; let i = index" 
            class="document-card"
            [class.complete]="doc.status === 'extracted'"
            [class.partial]="doc.status === 'partial'"
            [class.failed]="doc.status === 'failed'">
            
            <div class="document-header">
              <h4>
                📄 {{ doc.filename }}
                <span class="status-badge" [class]="'status-' + doc.status">
                  {{ doc.status }}
                </span>
              </h4>
              <button 
                *ngIf="doc.status !== 'failed'"
                (click)="loadDocumentInForm(doc, i)"
                class="btn btn-small">
                Remplir le formulaire
              </button>
            </div>

            <!-- Données extraites -->
            <div class="document-data">
              <div class="data-grid">
                <div class="data-item">
                  <label>Prénom:</label>
                  <span [class.missing]="!doc.data.prenom?.value || doc.data.prenom?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.prenom?.confidence ?? 1) < 0.7">
                    {{ doc.data.prenom?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.prenom?.justification" class="justification">
                    ({{ doc.data.prenom.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.prenom.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Nom:</label>
                  <span [class.missing]="!doc.data.nom?.value || doc.data.nom?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.nom?.confidence ?? 1) < 0.7">
                    {{ doc.data.nom?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.nom?.justification" class="justification">
                    ({{ doc.data.nom.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.nom.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Date de naissance:</label>
                  <span [class.missing]="!doc.data.date_naissance?.value || doc.data.date_naissance?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.date_naissance?.confidence ?? 1) < 0.7">
                    {{ doc.data.date_naissance?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.date_naissance?.justification" class="justification">
                    ({{ doc.data.date_naissance.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.date_naissance.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Fonction:</label>
                  <span [class.missing]="!doc.data.fonction?.value || doc.data.fonction?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.fonction?.confidence ?? 1) < 0.7">
                    {{ doc.data.fonction?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.fonction?.justification" class="justification">
                    ({{ doc.data.fonction.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.fonction.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Date d'embauche:</label>
                  <span [class.missing]="!doc.data.date_embauche?.value || doc.data.date_embauche?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.date_embauche?.confidence ?? 1) < 0.7">
                    {{ doc.data.date_embauche?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.date_embauche?.justification" class="justification">
                    ({{ doc.data.date_embauche.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.date_embauche.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Société:</label>
                  <span [class.missing]="!doc.data.societe?.value || doc.data.societe?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.societe?.confidence ?? 1) < 0.7">
                    {{ doc.data.societe?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.societe?.justification" class="justification">
                    ({{ doc.data.societe.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.societe.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Salaire brut (CFA):</label>
                  <span [class.missing]="!doc.data.salaire_brut?.value || doc.data.salaire_brut?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.salaire_brut?.confidence ?? 1) < 0.7">
                    {{ doc.data.salaire_brut?.value || 'Non disponible' }} <span *ngIf="doc.data.salaire_brut?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.salaire_brut?.justification" class="justification">
                    ({{ doc.data.salaire_brut.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.salaire_brut.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Impôts (CFA):</label>
                  <span [class.missing]="!doc.data.impots?.value || doc.data.impots?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.impots?.confidence ?? 1) < 0.7">
                    {{ doc.data.impots?.value || 'Non disponible' }} <span *ngIf="doc.data.impots?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.impots?.justification" class="justification">
                    ({{ doc.data.impots.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.impots.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Cotisations sociales (CFA):</label>
                  <span [class.missing]="!doc.data.cotisations_sociales?.value || doc.data.cotisations_sociales?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.cotisations_sociales?.confidence ?? 1) < 0.7">
                    {{ doc.data.cotisations_sociales?.value || 'Non disponible' }} <span *ngIf="doc.data.cotisations_sociales?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.cotisations_sociales?.justification" class="justification">
                    ({{ doc.data.cotisations_sociales.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.cotisations_sociales.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Salaire net (CFA):</label>
                  <span [class.missing]="!doc.data.salaire_net?.value || doc.data.salaire_net?.value === 'illisible'"
                        [class.low-confidence]="(doc.data.salaire_net?.confidence ?? 1) < 0.7">
                    {{ doc.data.salaire_net?.value || 'Non disponible' }} <span *ngIf="doc.data.salaire_net?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.salaire_net?.justification" class="justification">
                    ({{ doc.data.salaire_net.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.salaire_net.justification }}
                  </small>
                </div>
              </div>
            </div>

            <!-- Erreurs -->
            <div *ngIf="doc.errors && doc.errors.length > 0" class="errors-section">
              <strong>⚠️ Erreurs/Avertissements:</strong>
              <ul>
                <li *ngFor="let error of doc.errors">{{ error }}</li>
              </ul>
            </div>

            <!-- Barre de progression de complétude -->
            <div class="completeness-bar">
              <div class="completeness-label">
                Complétude: {{ extractionService.getCompletenessPercentage(doc) }}% | 
                Confiance moyenne: {{ extractionService.getAverageConfidence(doc) }}%
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  [style.width.%]="extractionService.getCompletenessPercentage(doc)"
                  [class.complete]="extractionService.getCompletenessPercentage(doc) === 100"
                  [class.partial]="extractionService.getCompletenessPercentage(doc) < 100 && extractionService.getCompletenessPercentage(doc) >= 50"
                  [class.low]="extractionService.getCompletenessPercentage(doc) < 50">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire de saisie -->
      <div *ngIf="showForm" class="form-section" id="employee-form">
        <h3>📝 Formulaire d'information employé</h3>
        <p class="form-description">Veuillez remplir ou vérifier les informations ci-dessous :</p>
        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="form-group">
              <label>Prénom *</label>
              <input 
                type="text" 
                formControlName="prenom" 
                [class.invalid]="isFieldInvalid('prenom')"
                placeholder="Entrez le prénom" />
              <div *ngIf="isFieldInvalid('prenom')" class="error-message">
                Le prénom est requis
              </div>
            </div>
            <div class="form-group">
              <label>Nom *</label>
              <input 
                type="text" 
                formControlName="nom" 
                [class.invalid]="isFieldInvalid('nom')"
                placeholder="Entrez le nom" />
              <div *ngIf="isFieldInvalid('nom')" class="error-message">
                Le nom est requis
              </div>
            </div>
            <div class="form-group">
              <label>Date de naissance *</label>
              <input 
                type="date" 
                formControlName="date_naissance" 
                [class.invalid]="isFieldInvalid('date_naissance')" />
              <div *ngIf="isFieldInvalid('date_naissance')" class="error-message">
                La date de naissance est requise
              </div>
            </div>
            <div class="form-group">
              <label>Fonction *</label>
              <input 
                type="text" 
                formControlName="fonction" 
                [class.invalid]="isFieldInvalid('fonction')"
                placeholder="Entrez la fonction" />
              <div *ngIf="isFieldInvalid('fonction')" class="error-message">
                La fonction est requise
              </div>
            </div>
            <div class="form-group">
              <label>Date d'embauche *</label>
              <input 
                type="date" 
                formControlName="date_embauche" 
                [class.invalid]="isFieldInvalid('date_embauche')" />
              <div *ngIf="isFieldInvalid('date_embauche')" class="error-message">
                La date d'embauche est requise
              </div>
            </div>
            <div class="form-group">
              <label>Société *</label>
              <input 
                type="text" 
                formControlName="societe" 
                [class.invalid]="isFieldInvalid('societe')"
                placeholder="Entrez le nom de la société" />
              <div *ngIf="isFieldInvalid('societe')" class="error-message">
                La société est requise
              </div>
            </div>
            <div class="form-group">
              <label>Salaire brut (CFA) *</label>
              <input 
                type="number" 
                formControlName="salaire_brut" 
                [class.invalid]="isFieldInvalid('salaire_brut')"
                placeholder="0"
                min="0"
                step="1" />
              <div *ngIf="isFieldInvalid('salaire_brut')" class="error-message">
                <span *ngIf="employeeForm.get('salaire_brut')?.hasError('required')">Le salaire brut est requis</span>
                <span *ngIf="employeeForm.get('salaire_brut')?.hasError('min')">Le salaire brut doit être positif</span>
              </div>
            </div>
            <div class="form-group">
              <label>Impôts (CFA) *</label>
              <input 
                type="number" 
                formControlName="impots" 
                [class.invalid]="isFieldInvalid('impots')"
                placeholder="0"
                min="0"
                step="1" />
              <div *ngIf="isFieldInvalid('impots')" class="error-message">
                <span *ngIf="employeeForm.get('impots')?.hasError('required')">Les impôts sont requis</span>
                <span *ngIf="employeeForm.get('impots')?.hasError('min')">Les impôts doivent être positifs</span>
              </div>
            </div>
            <div class="form-group">
              <label>Cotisations sociales (CFA) *</label>
              <input 
                type="number" 
                formControlName="cotisations_sociales" 
                [class.invalid]="isFieldInvalid('cotisations_sociales')"
                placeholder="0"
                min="0"
                step="1" />
              <div *ngIf="isFieldInvalid('cotisations_sociales')" class="error-message">
                <span *ngIf="employeeForm.get('cotisations_sociales')?.hasError('required')">Les cotisations sociales sont requises</span>
                <span *ngIf="employeeForm.get('cotisations_sociales')?.hasError('min')">Les cotisations sociales doivent être positives</span>
              </div>
            </div>
            <div class="form-group">
              <label>Salaire net (CFA) *</label>
              <input 
                type="number" 
                formControlName="salaire_net" 
                [class.invalid]="isFieldInvalid('salaire_net')"
                placeholder="0"
                min="0"
                step="1" />
              <div *ngIf="isFieldInvalid('salaire_net')" class="error-message">
                <span *ngIf="employeeForm.get('salaire_net')?.hasError('required')">Le salaire net est requis</span>
                <span *ngIf="employeeForm.get('salaire_net')?.hasError('min')">Le salaire net doit être positif</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="!employeeForm.valid" class="btn btn-success">
              ✓ Enregistrer
            </button>
            <button type="button" (click)="showForm = false" class="btn btn-secondary">
              ✕ Annuler
            </button>
          </div>
          <div *ngIf="!employeeForm.valid && employeeForm.touched" class="form-validation-summary">
            <strong>⚠️ Veuillez corriger les erreurs ci-dessus avant de soumettre le formulaire.</strong>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .document-extractor-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .action-section {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .btn-small {
      padding: 5px 10px;
      font-size: 14px;
    }

    .btn-success {
      background-color: #28a745;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .alert-error {
      padding: 15px;
      background-color: #f8d7da;
      color: #721c24;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .summary {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .stats {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    .stat-item {
      padding: 10px;
      background: white;
      border-radius: 4px;
    }

    .stat-item.success { border-left: 4px solid #28a745; }
    .stat-item.warning { border-left: 4px solid #ffc107; }
    .stat-item.error { border-left: 4px solid #dc3545; }

    .document-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .document-card.complete { border-left: 4px solid #28a745; }
    .document-card.partial { border-left: 4px solid #ffc107; }
    .document-card.failed { border-left: 4px solid #dc3545; }

    .document-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-left: 10px;
    }

    .status-extracted { background: #d4edda; color: #155724; }
    .status-partial { background: #fff3cd; color: #856404; }
    .status-failed { background: #f8d7da; color: #721c24; }

    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }

    .data-item {
      display: flex;
      flex-direction: column;
    }

    .data-item label {
      font-weight: bold;
      margin-bottom: 5px;
      color: #555;
    }

    .data-item .missing {
      color: #dc3545;
      font-style: italic;
    }

    .data-item .low-confidence {
      color: #ff9800;
      font-weight: bold;
    }

    .data-item .justification {
      display: block;
      color: #6c757d;
      font-size: 12px;
      font-style: italic;
      margin-top: 4px;
    }

    .errors-section {
      margin-top: 15px;
      padding: 15px;
      background: #fff3cd;
      border-radius: 4px;
    }

    .errors-section ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }

    .completeness-bar {
      margin-top: 15px;
    }

    .completeness-label {
      margin-bottom: 5px;
      font-size: 14px;
      color: #555;
    }

    .progress-bar {
      height: 20px;
      background: #e9ecef;
      border-radius: 10px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      transition: width 0.3s ease;
    }

    .progress-fill.complete { background: #28a745; }
    .progress-fill.partial { background: #ffc107; }
    .progress-fill.low { background: #dc3545; }

    .form-section {
      margin-top: 30px;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border: 2px solid #007bff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-description {
      color: #666;
      margin-bottom: 20px;
      font-style: italic;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-group input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .form-group input.invalid {
      border-color: #dc3545;
    }

    .form-group input.invalid:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
    }

    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }

    .form-validation-summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 4px;
      color: #856404;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .form-group label {
      color: #333;
      font-weight: 600;
    }
  `]
})
export class DocumentExtractorComponent implements OnInit {
  loading = false;
  extracting = false;
  extractionResponse: ExtractionResponse | null = null;
  errorMessage: string | null = null;
  lastExtractionTime: Date | null = null;
  showForm = false;
  employeeForm: FormGroup;

  constructor(
    public extractionService: DocumentExtractionService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      fonction: ['', Validators.required],
      date_embauche: ['', Validators.required],
      societe: ['', Validators.required],
      salaire_brut: [null, [Validators.required, Validators.min(0)]],
      impots: [null, [Validators.required, Validators.min(0)]],
      cotisations_sociales: [null, [Validators.required, Validators.min(0)]],
      salaire_net: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  extractDocuments(): void {
    this.loading = true;
    this.extracting = true;
    this.errorMessage = null;
    this.extractionResponse = null;

    this.extractionService.extractDocuments().subscribe({
      next: (response) => {
        this.extractionResponse = response;
        this.lastExtractionTime = new Date();
        this.loading = false;
        this.extracting = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'extraction:', error);
        this.errorMessage = error.message || 'Une erreur est survenue lors de l\'extraction des documents.';
        this.loading = false;
        this.extracting = false;
      }
    });
  }

  loadDocumentInForm(document: ExtractedDocument, index: number): void {
    const formatted = this.extractionService.formatForForm(document);
    
    console.log('Chargement du document dans le formulaire:', document);
    console.log('Données formatées:', formatted);
    
    // Afficher le formulaire d'abord
    this.showForm = true;
    
    // Utiliser setTimeout pour s'assurer que le formulaire est rendu avant de remplir les valeurs
    setTimeout(() => {
      const formData = {
        prenom: document.data.prenom?.value || '',
        nom: document.data.nom?.value || '',
        date_naissance: formatted.date_naissance_formatted || '',
        fonction: document.data.fonction?.value || '',
        date_embauche: formatted.date_embauche_formatted || '',
        societe: document.data.societe?.value || '',
        salaire_brut: formatted.salaire_brut_numeric ?? null,
        impots: formatted.impots_numeric ?? null,
        cotisations_sociales: formatted.cotisations_sociales_numeric ?? null,
        salaire_net: formatted.salaire_net_numeric ?? null
      };
      
      console.log('Données à insérer dans le formulaire:', formData);
      
      this.employeeForm.patchValue(formData);
      
      // Marquer les champs comme touchés pour afficher les valeurs
      this.employeeForm.markAllAsTouched();
      
      console.log('Valeurs du formulaire après patchValue:', this.employeeForm.value);
      
      // Scroll vers le formulaire
      setTimeout(() => {
        const formSection = window.document.querySelector('#employee-form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }, 50);
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Données du formulaire:', this.employeeForm.value);
      // Ici, vous pouvez ajouter la logique pour sauvegarder les données
      // Par exemple, un appel à votre API backend
      alert('Formulaire soumis avec succès!');
      this.showForm = false;
    }
  }

  getCompletedCount(): number {
    return this.extractionResponse?.documents.filter(d => d.status === 'extracted').length || 0;
  }

  getPartialCount(): number {
    return this.extractionResponse?.documents.filter(d => d.status === 'partial').length || 0;
  }

  getFailedCount(): number {
    return this.extractionResponse?.documents.filter(d => d.status === 'failed').length || 0;
  }

  /**
   * Vérifie si un champ du formulaire est invalide et a été touché
   * @param fieldName - Nom du champ à vérifier
   * @returns true si le champ est invalide et a été touché
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Récupère le message d'erreur pour un champ
   * @param fieldName - Nom du champ
   * @returns Message d'erreur ou null
   */
  getFieldError(fieldName: string): string | null {
    const field = this.employeeForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return 'Ce champ est requis';
      }
      if (field.errors['min']) {
        return 'La valeur doit être positive';
      }
    }
    return null;
  }

  /**
   * Affiche ou masque le formulaire
   */
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      // Scroll vers le formulaire après un court délai
      setTimeout(() => {
        const formSection = window.document.querySelector('#employee-form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }
}
