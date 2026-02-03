import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  template: `
    <div class="menu-container">
      <header class="header">
        <h1>Menú Principal</h1>
        <a routerLink="/" class="btn btn-secondary">Volver</a>
      </header>

      <div class="menu-options">
        <a routerLink="/equipos" class="menu-card">
          <div class="card-icon">🖥️</div>
          <h2>Equipos</h2>
          <p>Ver y gestionar equipos</p>
        </a>

        <a routerLink="/ambientes" class="menu-card">
          <div class="card-icon">🏢</div>
          <h2>Ambientes</h2>
          <p>Ver y gestionar ambientes</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .menu-container {
      padding: 2rem;
      min-height: 100vh;
      background: #f5f5f5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    h1 {
      margin: 0;
      color: #333;
    }
    .menu-options {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .menu-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: #333;
      transition: transform 0.2s, box-shadow 0.2s;
      min-width: 250px;
    }
    .menu-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    .card-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    h2 {
      margin: 0 0 0.5rem;
      color: #667eea;
    }
    p {
      margin: 0;
      color: #666;
    }
  `]
})
export class MenuComponent {}
