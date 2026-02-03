import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-inventario-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css'
})
export class InventarioListComponent implements OnInit {
  private readonly equipoService = inject(EquipoService);

  readonly equipos = signal<Equipo[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.loading.set(true);
    this.error.set(null);

    this.equipoService.getAll().subscribe({
      next: (data) => {
        this.equipos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar equipos');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  deleteEquipo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
      this.equipoService.delete(id).subscribe({
        next: () => {
          this.loadEquipos();
        },
        error: (err) => {
          this.error.set('Error al eliminar equipo');
          console.error(err);
        }
      });
    }
  }
}
