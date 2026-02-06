import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { AmbienteService } from '../../services/ambiente.service';
import { EquipoForm, Ambiente, CATEGORIAS_EQUIPO } from '../../models/equipo.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  private readonly equipoService = inject(EquipoService);
  private readonly ambienteService = inject(AmbienteService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  readonly isEditing = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly ambientes = signal<Ambiente[]>([]);
  readonly categorias = CATEGORIAS_EQUIPO;

  form: EquipoForm = {
    nombre: '',
    descripcion: '',
    piso: '',
    categoria: '',
    marca: '',
    modelo: '',
    estado: '',
    ambientecodigo: '',
    ambientenombre: ''
  };

  private equipoId: number | null = null;
  private fromCategoria: string | null = null;

  ngOnInit(): void {
    this.loadAmbientes();

    // Get categoria from query params
    this.fromCategoria = this.route.snapshot.queryParamMap.get('categoria');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.equipoId = +id;
      this.loadEquipo(this.equipoId);
    } else if (this.fromCategoria) {
      this.form.categoria = this.fromCategoria;
    }
  }

  private loadAmbientes(): void {
    this.ambienteService.getAll().subscribe({
      next: (data) => {
        this.ambientes.set(data);
      },
      error: (err) => {
        console.error('Error al cargar ambientes', err);
      }
    });
  }

  private loadEquipo(id: number): void {
    this.loading.set(true);
    this.equipoService.getById(id).subscribe({
      next: (equipo) => {
        this.form = {
          nombre: equipo.nombre,
          descripcion: equipo.descripcion || '',
          piso: equipo.piso || '',
          categoria: equipo.categoria || '',
          marca: equipo.marca,
          modelo: equipo.modelo,
          estado: equipo.estado,
          ambientecodigo: equipo.ambientecodigo || '',
          ambientenombre: equipo.ambientenombre || ''
        };
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar equipo');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onAmbienteChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ambienteId = select.value;

    if (!ambienteId) {
      this.form.ambientecodigo = '';
      this.form.ambientenombre = '';
      return;
    }

    const ambiente = this.ambientes().find(a => a.id === +ambienteId);
    if (ambiente) {
      this.form.ambientecodigo = ambiente.codigo;
      this.form.ambientenombre = ambiente.nombre;
    }
  }

  onSubmit(): void {
    if (this.equipoId) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.loading.set(true);
    this.error.set(null);

    this.equipoService.create(this.form).subscribe({
      next: () => {
        this.router.navigate(['/equipos']);
      },
      error: (err) => {
        this.error.set('Error al crear equipo');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  private update(): void {
    if (!this.equipoId) return;

    this.loading.set(true);
    this.error.set(null);

    this.equipoService.update(this.equipoId, this.form).subscribe({
      next: () => {
        this.router.navigate(['/equipos']);
      },
      error: (err) => {
        this.error.set('Error al actualizar equipo');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.toastService.success('Se canceló exitosamente');

    if (this.fromCategoria) {
      this.router.navigate(['/equipos'], { queryParams: { categoria: this.fromCategoria } });
    } else {
      this.router.navigate(['/equipos']);
    }
  }
}
