import { Component, inject, signal, computed, OnInit } from '@angular/core';
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

  // Paginación
  readonly pageSize = 10;
  readonly currentPage = signal(1);
  readonly totalPages = computed(() => Math.ceil(this.equipos().length / this.pageSize));
  readonly equiposPaginados = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.equipos().slice(start, end);
  });

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

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
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
