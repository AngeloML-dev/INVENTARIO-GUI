import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  template: `
    @if (dialogService.isOpen()) {
      <div class="dialog-overlay" (click)="dialogService.cancel()">
        <div class="dialog" (click)="$event.stopPropagation()">
          <div class="dialog-icon">🗑️</div>
          <h3 class="dialog-title">{{ dialogService.data().title }}</h3>
          <p class="dialog-message">{{ dialogService.data().message }}</p>
          <div class="dialog-actions">
            <button class="btn btn-secondary" (click)="dialogService.cancel()">
              Cancelar
            </button>
            <button class="btn btn-danger" (click)="dialogService.confirm()">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
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

    .dialog {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      text-align: center;
      animation: slideUp 0.3s ease;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dialog-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .dialog-title {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: #1a1a2e;
      font-weight: 600;
    }

    .dialog-message {
      margin: 0 0 1.5rem;
      color: #666;
      font-size: 1rem;
      line-height: 1.5;
    }

    .dialog-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .btn-secondary {
      background: #e9ecef;
      color: #495057;
    }

    .btn-secondary:hover {
      background: #dee2e6;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
    }
  `]
})
export class ConfirmDialogComponent {
  readonly dialogService = inject(ConfirmDialogService);
}
