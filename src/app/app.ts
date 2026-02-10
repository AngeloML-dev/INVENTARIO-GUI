import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    ToastComponent,
    ConfirmDialogComponent,
    AuthModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  getUserName(): string {
    const user = this.authService.user();
    if (!user) return '';
    
    // Intentar obtener el display_name de los metadatos
    const displayName = user.user_metadata?.['display_name'];
    
    if (displayName) {
      // Si tiene espacios, tomar solo la primera palabra
      const firstName = displayName.split(' ')[0];
      return firstName.toUpperCase();
    }
    
    // Fallback: extraer del email
    const email = user.email;
    if (!email) return '';
    
    const username = email.split('@')[0];
    const firstName = username.split(/[._-]/)[0];
    return firstName.toUpperCase();
  }

  logout(): void {
    this.authService.signOut();
    this.toastService.success('Sesión cerrada');
    // Redirigir al home después de cerrar sesión
    this.router.navigate(['/']);
  }
}
