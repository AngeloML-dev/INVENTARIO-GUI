import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AmbienteService } from '../../services/ambiente.service';
import { AmbienteForm } from '../../models/equipo.model';

@Component({
  selector: 'app-ambiente-form',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <header class="header">
        <h1>{{ isEditing() ? 'Editar' : 'Nuevo' }} Ambiente</h1>
      </header>

      @if (loading()) {
        <div class="loading">Cargando...</div>
      }

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (!loading()) {
        <form (ngSubmit)="onSubmit()" class="form">
          <div class="form-group">
            <label for="codigo">Código *</label>
            <input
              type="text"
              id="codigo"
              [(ngModel)]="form.codigo"
              name="codigo"
              required
              class="form-control"
              placeholder="Ej: A001"
            />
          </div>

          <div class="form-group">
            <label for="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              [(ngModel)]="form.nombre"
              name="nombre"
              required
              class="form-control"
              placeholder="Ej: Aula 101"
            />
          </div>

          <div class="form-group">
            <label for="ubicacion">Ubicación *</label>
            <input
              type="text"
              id="ubicacion"
              [(ngModel)]="form.ubicacion"
              name="ubicacion"
              required
              class="form-control"
              placeholder="Ej: Edificio A - Piso 1"
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              {{ isEditing() ? 'Actualizar' : 'Crear' }}
            </button>
            <button type="button" (click)="cancel()" class="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      margin-bottom: 2rem;
    }
    h1 { margin: 0; }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #4a5568;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
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
      border-radius: 8px;
      margin-bottom: 1rem;
    }
  `]
})
export class AmbienteFormComponent implements OnInit {
  private readonly ambienteService = inject(AmbienteService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isEditing = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  form: AmbienteForm = {
    codigo: '',
    nombre: '',
    ubicacion: ''
  };

  private ambienteId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.ambienteId = +id;
      this.loadAmbiente(this.ambienteId);
    }
  }

  private loadAmbiente(id: number): void {
    this.loading.set(true);
    this.ambienteService.getById(id).subscribe({
      next: (ambiente) => {
        this.form = {
          codigo: ambiente.codigo,
          nombre: ambiente.nombre,
          ubicacion: ambiente.ubicacion
        };
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar ambiente');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.ambienteId) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ambienteService.create(this.form).subscribe({
      next: () => {
        this.router.navigate(['/ambientes']);
      },
      error: (err) => {
        this.error.set('Error al crear ambiente');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  private update(): void {
    if (!this.ambienteId) return;

    this.loading.set(true);
    this.error.set(null);

    this.ambienteService.update(this.ambienteId, this.form).subscribe({
      next: () => {
        this.router.navigate(['/ambientes']);
      },
      error: (err) => {
        this.error.set('Error al actualizar ambiente');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/ambientes']);
  }
}
