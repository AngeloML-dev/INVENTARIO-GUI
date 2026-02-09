import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen()) {
      <div class="modal-overlay" (click)="close()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="close()">×</button>

          <!-- Logo/Header -->
          <div class="modal-header">
            <div class="logo">🏢 ADEX</div>
            <h2>{{ isLogin() ? 'Iniciar Sesión' : 'Crear Cuenta' }}</h2>
          </div>

          <!-- Loading -->
          @if (loading()) {
            <div class="loading">Cargando...</div>
          }

          <!-- Error -->
          @if (error()) {
            <div class="error">{{ error() }}</div>
          }

          <!-- Form -->
          @if (!loading()) {
            <form (ngSubmit)="onSubmit()">
              <!-- Register only fields -->
              @if (!isLogin()) {
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    [(ngModel)]="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    class="form-control"
                  />
                </div>
              }

              <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  class="form-control"
                />
              </div>

              <div class="form-group">
                <label for="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  class="form-control"
                />
              </div>

              @if (!isLogin()) {
                <div class="form-group">
                  <label for="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    [(ngModel)]="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    class="form-control"
                  />
                </div>
              }

              <button type="submit" class="btn btn-primary">
                {{ isLogin() ? 'Iniciar Sesión' : 'Crear Cuenta' }}
              </button>
            </form>

            <!-- Toggle between login/register -->
            <div class="toggle-section">
              @if (isLogin()) {
                <p>¿No tienes cuenta?
                  <a (click)="setMode('register')">Regístrate</a>
                </p>
                <p class="forgot-password">
                  <a (click)="setMode('reset')">¿Olvidaste tu contraseña?</a>
                </p>
              } @else if (isReset()) {
                <p>¿Recordaste tu contraseña?
                  <a (click)="setMode('login')">Inicia Sesión</a>
                </p>
              } @else {
                <p>¿Ya tienes cuenta?
                  <a (click)="setMode('login')">Inicia Sesión</a>
                </p>
              }
            </div>
          }

          <!-- Success message after registration -->
          @if (showConfirmationMessage()) {
            <div class="success-message">
              <div class="success-icon">✓</div>
              <h3>¡Cuenta creada!</h3>
              <p>Por favor verifica tu correo electrónico para activar tu cuenta.</p>
              <button class="btn btn-primary" (click)="setMode('login')">Ir a Iniciar Sesión</button>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      position: relative;
      animation: slideUp 0.3s ease;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #999;
      transition: color 0.2s;
    }

    .close-btn:hover {
      color: #333;
    }

    .modal-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .logo {
      font-size: 2rem;
      font-weight: bold;
      color: #0055A4;
      margin-bottom: 0.5rem;
    }

    .modal-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.25rem;
      font-weight: 500;
      color: #333;
      font-size: 0.875rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #0055A4;
      box-shadow: 0 0 0 3px rgba(0, 85, 164, 0.1);
    }

    .btn {
      width: 100%;
      padding: 0.875rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      margin-top: 0.5rem;
    }

    .btn-primary {
      background: #0055A4;
      color: white;
    }

    .btn-primary:hover {
      background: #004080;
    }

    .btn-primary:active {
      transform: scale(0.98);
    }

    .toggle-section {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .toggle-section p {
      margin: 0.5rem 0;
      color: #666;
      font-size: 0.875rem;
    }

    .toggle-section a {
      color: #0055A4;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
    }

    .toggle-section a:hover {
      text-decoration: underline;
    }

    .forgot-password {
      font-size: 0.8rem !important;
    }

    .error {
      background: #fee;
      color: #c00;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .success-message {
      text-align: center;
      padding: 1rem;
    }

    .success-icon {
      width: 60px;
      height: 60px;
      background: #28a745;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 1rem;
    }

    .success-message h3 {
      margin: 0 0 0.5rem;
      color: #333;
    }

    .success-message p {
      color: #666;
      margin-bottom: 1.5rem;
    }
  `]
})
export class AuthModalComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  readonly isOpen = signal(false);
  readonly isLogin = signal(true);
  readonly isReset = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly showConfirmationMessage = signal(false);

  email = '';
  password = '';
  confirmPassword = '';
  nombre = '';

  constructor() {
    // Listen for open modal event
    window.addEventListener('open-auth-modal', () => {
      this.open();
    });
  }

  open(): void {
    this.isOpen.set(true);
    this.resetForm();
  }

  close(): void {
    this.isOpen.set(false);
  }

  setMode(mode: 'login' | 'register' | 'reset'): void {
    this.isLogin.set(mode === 'login');
    this.isReset.set(mode === 'reset');
    this.error.set(null);
    this.showConfirmationMessage.set(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.nombre = '';
    this.error.set(null);
    this.loading.set(false);
  }

  async onSubmit(): Promise<void> {
    this.error.set(null);

    if (!this.email || !this.password) {
      this.error.set('Por favor completa todos los campos');
      return;
    }

    if (!this.isLogin() && this.password !== this.confirmPassword) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }

    this.loading.set(true);

    if (this.isLogin()) {
      const { error } = await this.authService.signIn(this.email, this.password);
      this.loading.set(false);

      if (error) {
        this.error.set(error);
      } else {
        this.toastService.success('¡Bienvenido de nuevo!');
        this.close();
      }
    } else if (this.isReset()) {
      const { error } = await this.authService.resetPassword(this.email);
      this.loading.set(false);

      if (error) {
        this.error.set(error);
      } else {
        this.toastService.success('Se ha enviado un correo para restablecer tu contraseña');
        this.setMode('login');
      }
    } else {
      const { error, needsConfirmation } = await this.authService.signUp(this.email, this.password);
      this.loading.set(false);

      if (error) {
        this.error.set(error);
      } else if (needsConfirmation) {
        this.showConfirmationMessage.set(true);
      } else {
        this.toastService.success('¡Cuenta creada exitosamente!');
        this.close();
      }
    }
  }
}
