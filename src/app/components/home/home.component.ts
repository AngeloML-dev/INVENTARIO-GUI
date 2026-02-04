import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="welcome-container">
      <div class="welcome-content">
        <h1>INVENTARIO ADEX</h1>
        <p>Sistema de Gestión del Área de Soporte Informático</p>
        <button routerLink="/menu" class="btn btn-primary btn-start">
          Start
        </button>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #0055A4;
    }
    .welcome-content {
      text-align: center;
      color: white;
      padding: 2rem;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    .btn-start {
      padding: 1rem 3rem;
      font-size: 1.5rem;
      background: white;
      color: #0055A4;
    }

    .btn-start:hover {
      background: #004080;
      color: white;
    }
  `]
})
export class HomeComponent {}
