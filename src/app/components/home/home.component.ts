import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="welcome-container">
      <div class="welcome-content">
        <h1>INVENTARIO ADEX</h1>
        <p>Sistema de Gestión del Área de Soporte Informático</p>

        @if (authService.isAuthenticated()) {
          <button (click)="goToMenu()" class="btn btn-primary btn-start">
            Ir al Menú
          </button>
        } @else {
          <button (click)="openLogin()" class="btn btn-primary btn-start">
            Iniciar Sesión
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #0055A4 0%, #003366 100%);
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
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-start:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      background: #f0f0f0;
    }

    .btn-start:active {
      transform: translateY(-1px);
    }
  `]
})
export class HomeComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  openLogin(): void {
    // Access the auth modal through a reference
    // Since we can't easily access the component, we'll use a custom event
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
