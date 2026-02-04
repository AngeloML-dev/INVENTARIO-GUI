import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { AmbienteService } from '../../services/ambiente.service';
import { EquipoForm, Ambiente } from '../../models/equipo.model';

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

  readonly isEditing = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly ambientes = signal<Ambiente[]>([]);

  form: EquipoForm = {
    nombre: '',
    descripcion: '',
    marca: '',
    modelo: '',
    estado: '',
    ambientecodigo: '',
    ambientenombre: ''
  };

  private equipoId: number | null = null;

  ngOnInit(): void {
    this.loadAmbientes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.equipoId = +id;
      this.loadEquipo(this.equipoId);
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
    this.router.navigate(['/equipos']);
  }
}
