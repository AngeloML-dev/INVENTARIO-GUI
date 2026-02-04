import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-inventario-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inventario-list.component.html',
  styleUrl: './inventario-list.component.css'
})
export class InventarioListComponent implements OnInit {
  private readonly equipoService = inject(EquipoService);

  readonly equipos = signal<Equipo[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  // Ordenamiento
  readonly sortField = signal<'id' | 'nombre' | 'marca' | 'modelo'>('id');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  // Paginación
  readonly pageSize = 10;
  readonly currentPage = signal(1);

  readonly totalPages = computed(() => Math.ceil(this.equiposOrdenados().length / this.pageSize));

  readonly equiposOrdenados = computed(() => {
    const field = this.sortField();
    const order = this.sortOrder();
    return [...this.equipos()].sort((a, b) => {
      const aVal = a[field] || '';
      const bVal = b[field] || '';
      const comparison = aVal.toString().localeCompare(bVal.toString());
      return order === 'asc' ? comparison : -comparison;
    });
  });

  readonly equiposPaginados = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.equiposOrdenados().slice(start, end);
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

  setSortField(field: 'id' | 'nombre' | 'marca' | 'modelo'): void {
    if (this.sortField() === field) {
      // Si ya está ordenado por este campo, cambiar dirección
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      // Nuevo campo, ordenar ascendente por defecto
      this.sortField.set(field);
      this.sortOrder.set('asc');
    }
  }

  getSortIcon(field: string): string {
    if (this.sortField() !== field) return '↕';
    return this.sortOrder() === 'asc' ? '↑' : '↓';
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
