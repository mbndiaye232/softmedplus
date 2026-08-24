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
                        [class.low-confidence]="doc.data.prenom?.confidence < 0.7">
                    {{ doc.data.prenom?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.prenom?.justification" class="justification">
                    ({{ doc.data.prenom.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.prenom.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Nom:</label>
                  <span [class.missing]="!doc.data.nom?.value || doc.data.nom?.value === 'illisible'"
                        [class.low-confidence]="doc.data.nom?.confidence < 0.7">
                    {{ doc.data.nom?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.nom?.justification" class="justification">
                    ({{ doc.data.nom.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.nom.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Date de naissance:</label>
                  <span [class.missing]="!doc.data.date_naissance?.value || doc.data.date_naissance?.value === 'illisible'"
                        [class.low-confidence]="doc.data.date_naissance?.confidence < 0.7">
                    {{ doc.data.date_naissance?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.date_naissance?.justification" class="justification">
                    ({{ doc.data.date_naissance.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.date_naissance.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Fonction:</label>
                  <span [class.missing]="!doc.data.fonction?.value || doc.data.fonction?.value === 'illisible'"
                        [class.low-confidence]="doc.data.fonction?.confidence < 0.7">
                    {{ doc.data.fonction?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.fonction?.justification" class="justification">
                    ({{ doc.data.fonction.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.fonction.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Date d'embauche:</label>
                  <span [class.missing]="!doc.data.date_embauche?.value || doc.data.date_embauche?.value === 'illisible'"
                        [class.low-confidence]="doc.data.date_embauche?.confidence < 0.7">
                    {{ doc.data.date_embauche?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.date_embauche?.justification" class="justification">
                    ({{ doc.data.date_embauche.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.date_embauche.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Société:</label>
                  <span [class.missing]="!doc.data.societe?.value || doc.data.societe?.value === 'illisible'"
                        [class.low-confidence]="doc.data.societe?.confidence < 0.7">
                    {{ doc.data.societe?.value || 'Non disponible' }}
                  </span>
                  <small *ngIf="doc.data.societe?.justification" class="justification">
                    ({{ doc.data.societe.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.societe.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Salaire brut (CFA):</label>
                  <span [class.missing]="!doc.data.salaire_brut?.value || doc.data.salaire_brut?.value === 'illisible'"
                        [class.low-confidence]="doc.data.salaire_brut?.confidence < 0.7">
                    {{ doc.data.salaire_brut?.value || 'Non disponible' }} <span *ngIf="doc.data.salaire_brut?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.salaire_brut?.justification" class="justification">
                    ({{ doc.data.salaire_brut.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.salaire_brut.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Impôts (CFA):</label>
                  <span [class.missing]="!doc.data.impots?.value || doc.data.impots?.value === 'illisible'"
                        [class.low-confidence]="doc.data.impots?.confidence < 0.7">
                    {{ doc.data.impots?.value || 'Non disponible' }} <span *ngIf="doc.data.impots?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.impots?.justification" class="justification">
                    ({{ doc.data.impots.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.impots.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Cotisations sociales (CFA):</label>
                  <span [class.missing]="!doc.data.cotisations_sociales?.value || doc.data.cotisations_sociales?.value === 'illisible'"
                        [class.low-confidence]="doc.data.cotisations_sociales?.confidence < 0.7">
                    {{ doc.data.cotisations_sociales?.value || 'Non disponible' }} <span *ngIf="doc.data.cotisations_sociales?.value">CFA</span>
                  </span>
                  <small *ngIf="doc.data.cotisations_sociales?.justification" class="justification">
                    ({{ doc.data.cotisations_sociales.confidence * 100 | number:'1.0-0' }}%) {{ doc.data.cotisations_sociales.justification }}
                  </small>
                </div>
                <div class="data-item">
                  <label>Salaire net (CFA):</label>
                  <span [class.missing]="!doc.data.salaire_net?.value || doc.data.salaire_net?.value === 'illisible'"
                        [class.low-confidence]="doc.data.salaire_net?.confidence < 0.7">
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
      <div *ngIf="showForm" class="form-section">
        <h3>Formulaire d'information employé</h3>
        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <div class="form-group">
              <label>Prénom *</label>
              <input type="text" formControlName="prenom" />
            </div>
            <div class="form-group">
              <label>Nom *</label>
              <input type="text" formControlName="nom" />
            </div>
            <div class="form-group">
              <label>Date de naissance *</label>
              <input type="date" formControlName="date_naissance" />
            </div>
            <div class="form-group">
              <label>Fonction *</label>
              <input type="text" formControlName="fonction" />
            </div>
            <div class="form-group">
              <label>Date d'embauche *</label>
              <input type="date" formControlName="date_embauche" />
            </div>
            <div class="form-group">
              <label>Société *</label>
              <input type="text" formControlName="societe" />
            </div>
            <div class="form-group">
              <label>Salaire brut (CFA) *</label>
              <input type="number" formControlName="salaire_brut" />
            </div>
            <div class="form-group">
              <label>Impôts (CFA) *</label>
              <input type="number" formControlName="impots" />
            </div>
            <div class="form-group">
              <label>Cotisations sociales (CFA) *</label>
              <input type="number" formControlName="cotisations_sociales" />
            </div>
            <div class="form-group">
              <label>Salaire net (CFA) *</label>
              <input type="number" formControlName="salaire_net" />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="!employeeForm.valid" class="btn btn-success">
              Enregistrer
            </button>
            <button type="button" (click)="showForm = false" class="btn btn-secondary">
              Annuler
            </button>
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
    }

    .form-actions {
      display: flex;
      gap: 10px;
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
    private extractionService: DocumentExtractionService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      date_naissance: ['', Validators.required],
      fonction: ['', Validators.required],
      date_embauche: ['', Validators.required],
      societe: ['', Validators.required],
      salaire_brut: ['', [Validators.required, Validators.min(0)]],
      impots: ['', [Validators.required, Validators.min(0)]],
      cotisations_sociales: ['', [Validators.required, Validators.min(0)]],
      salaire_net: ['', [Validators.required, Validators.min(0)]]
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
    
    this.employeeForm.patchValue({
      prenom: document.data.prenom || '',
      nom: document.data.nom || '',
      date_naissance: formatted.date_naissance_formatted || '',
      fonction: document.data.fonction || '',
      date_embauche: formatted.date_embauche_formatted || '',
      societe: document.data.societe || '',
      salaire_brut: formatted.salaire_brut_numeric || '',
      impots: formatted.impots_numeric || '',
      cotisations_sociales: formatted.cotisations_sociales_numeric || '',
      salaire_net: formatted.salaire_net_numeric || ''
    });

    this.showForm = true;
    // Scroll vers le formulaire
    setTimeout(() => {
      const formSection = window.document.querySelector('.form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
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
}
