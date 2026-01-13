import { Component } from '@angular/core';
import { DocumentExtractorComponent } from './angular-component-example';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentExtractorComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Extraction de Documents</h1>
      </header>
      <main>
        <app-document-extractor></app-document-extractor>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f5f5f5;
    }
    header {
      background: #007bff;
      color: white;
      padding: 20px;
      text-align: center;
    }
    header h1 {
      margin: 0;
    }
    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'angular-document-extractor';
}
