import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type">
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="toastService.remove(toast.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease;
      min-width: 280px;
      max-width: 400px;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .toast-message {
      font-size: 0.95rem;
      font-weight: 500;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      opacity: 0.7;
      padding: 0;
      line-height: 1;
    }

    .toast-close:hover {
      opacity: 1;
    }

    .toast-success {
      background: #d4edda;
      color: #155724;
      border-left: 4px solid #28a745;
    }

    .toast-success .toast-close {
      color: #155724;
    }

    .toast-error {
      background: #f8d7da;
      color: #721c24;
      border-left: 4px solid #dc3545;
    }

    .toast-error .toast-close {
      color: #721c24;
    }

    .toast-info {
      background: #d1ecf1;
      color: #0c5460;
      border-left: 4px solid #17a2b8;
    }

    .toast-info .toast-close {
      color: #0c5460;
    }

    .toast-warning {
      background: #fff3cd;
      color: #856404;
      border-left: 4px solid #ffc107;
    }

    .toast-warning .toast-close {
      color: #856404;
    }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
