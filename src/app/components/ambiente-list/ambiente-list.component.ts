import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AmbienteService } from '../../services/ambiente.service';
import { Ambiente } from '../../models/equipo.model';

@Component({
  selector: 'app-ambiente-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <header class="header">
        <div>
          <a routerLink="/menu" class="btn btn-secondary btn-sm">← Volver</a>
          <h1>Ambientes</h1>
        </div>
        <a routerLink="/ambientes/nuevo" class="btn btn-primary">
          + Agregar
        </a>
      </header>

      @if (loading()) {
        <div class="loading">Cargando ambientes...</div>
      }

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (!loading() && !error()) {
        <!-- Vista de tabla para desktop -->
        <div class="table-container desktop-only">
          <table class="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (ambiente of ambientes(); track ambiente.id) {
                <tr>
                  <td>{{ ambiente.codigo }}</td>
                  <td>{{ ambiente.nombre }}</td>
                  <td>{{ ambiente.ubicacion }}</td>
                  <td class="actions">
                    <a [routerLink]="['/ambientes', ambiente.id]" class="btn btn-sm btn-edit">
                      Editar
                    </a>
                    <button (click)="deleteAmbiente(ambiente.id!)" class="btn btn-sm btn-delete">
                      Eliminar
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="4" class="empty">No hay ambientes</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Vista de tarjetas para mobile -->
        <div class="cards-container mobile-only">
          @for (ambiente of ambientes(); track ambiente.id) {
            <div class="card">
              <div class="card-header">
                <span class="card-codigo">{{ ambiente.codigo }}</span>
              </div>
              <div class="card-body">
                <h3>{{ ambiente.nombre }}</h3>
                <p class="card-ubicacion">📍 {{ ambiente.ubicacion }}</p>
              </div>
              <div class="card-actions">
                <a [routerLink]="['/ambientes', ambiente.id]" class="btn btn-sm btn-edit">
                  Editar
                </a>
                <button (click)="deleteAmbiente(ambiente.id!)" class="btn btn-sm btn-delete">
                  Eliminar
                </button>
              </div>
            </div>
          } @empty {
            <div class="empty-card">No hay ambientes registrados</div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .header div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    h1 { margin: 0; }

    .table-container { display: block; }
    .desktop-only { display: table; }
    .mobile-only { display: none; }

    .cards-container {
      display: none;
      flex-direction: column;
      gap: 1rem;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .card-codigo {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .card-body {
      padding: 1rem;
    }

    .card-body h3 {
      margin: 0 0 0.5rem;
      font-size: 1.125rem;
      color: #1a1a2e;
    }

    .card-ubicacion {
      margin: 0;
      color: #667eea;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid #eee;
    }

    .card-actions .btn {
      flex: 1;
    }

    .empty-card {
      text-align: center;
      padding: 2rem;
      color: #999;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .table th,
    .table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .table th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .table tr:hover {
      background: #f5f5f5;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .loading {
      padding: 2rem;
      text-align: center;
      color: #666;
    }

    .error {
      padding: 1rem;
      background: #fee;
      color: #c00;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .empty {
      text-align: center;
      color: #999;
      padding: 2rem;
    }

    @media (max-width: 1000px) {
      .desktop-only { display: none !important; }
      .mobile-only { display: flex !important; }
      .cards-container { display: flex; }
      .header { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .header div { width: 100%; justify-content: space-between; }
    }
  `]
})
export class AmbienteListComponent implements OnInit {
  private readonly ambienteService = inject(AmbienteService);

  readonly ambientes = signal<Ambiente[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAmbientes();
  }

  loadAmbientes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ambienteService.getAll().subscribe({
      next: (data) => {
        this.ambientes.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar ambientes');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  deleteAmbiente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este ambiente?')) {
      this.ambienteService.delete(id).subscribe({
        next: () => {
          this.loadAmbientes();
        },
        error: (err) => {
          this.error.set('Error al eliminar ambiente');
          console.error(err);
        }
      });
    }
  }
}
