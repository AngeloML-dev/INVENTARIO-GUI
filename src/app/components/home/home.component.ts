import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="welcome-container">
      <div class="welcome-content">
        <h1>Inventario de Equipos</h1>
        <p>Sistema de gestión de equipos y ambientes</p>
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    }
  `]
})
export class HomeComponent {}
