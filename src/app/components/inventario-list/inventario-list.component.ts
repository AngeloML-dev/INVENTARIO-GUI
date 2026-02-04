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

  // Menú flotante de filtros
  readonly showFilters = signal(false);

  // Filtros
  readonly filterPiso = signal('');
  readonly filterEstado = signal('');
  readonly filterAmbiente = signal('');
  readonly filterSearch = signal('');

  // Ordenamiento
  readonly sortField = signal<'nombre' | 'marca' | 'modelo' | 'ambientecodigo'>('ambientecodigo');
  readonly sortOrder = signal<'asc' | 'desc'>('asc');

  // Paginación
  readonly pageSize = 10;
  readonly currentPage = signal(1);

  // Opciones de filtros
  readonly estados = ['Nuevo', 'Usado', 'Desgastado', 'Obsoleto'];
  readonly pisos = ['Sótano', 'Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6', 'Piso 7', 'Piso 8'];

  // Ambientes únicos (calculados)
  readonly ambientes = computed(() => {
    const ambientesSet = new Set<string>();
    this.equipos().forEach(e => {
      if (e.ambientecodigo) ambientesSet.add(e.ambientecodigo);
    });
    return Array.from(ambientesSet).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
  });

  readonly totalPages = computed(() => Math.ceil(this.equiposFiltradosOrdenados().length / this.pageSize));

  readonly equiposFiltradosOrdenados = computed(() => {
    let result = [...this.equipos()];

    // Aplicar filtros
    const piso = this.filterPiso();
    const estado = this.filterEstado().toLowerCase();
    const ambiente = this.filterAmbiente().toLowerCase();
    const search = this.filterSearch().toLowerCase();

    if (piso) {
      result = result.filter(e => e.piso === piso);
    }

    if (estado) {
      result = result.filter(e =>
        e.estado?.toLowerCase() === estado
      );
    }

    if (ambiente) {
      result = result.filter(e =>
        e.ambientecodigo?.toLowerCase().includes(ambiente)
      );
    }

    if (search) {
      result = result.filter(e =>
        e.nombre?.toLowerCase().includes(search) ||
        e.marca?.toLowerCase().includes(search) ||
        e.modelo?.toLowerCase().includes(search)
      );
    }

    // Aplicar ordenamiento
    const field = this.sortField();
    const order = this.sortOrder();
    result.sort((a, b) => {
      const aVal = (a[field] || '') as string;
      const bVal = (b[field] || '') as string;
      const comparison = aVal.localeCompare(bVal, undefined, { numeric: true, sensitivity: 'base' });
      return order === 'asc' ? comparison : -comparison;
    });

    return result;
  });

  readonly equiposPaginados = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.equiposFiltradosOrdenados().slice(start, end);
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

  toggleFilters(): void {
    this.showFilters.update(v => !v);
  }

  clearFilters(): void {
    this.filterPiso.set('');
    this.filterEstado.set('');
    this.filterAmbiente.set('');
    this.filterSearch.set('');
    this.currentPage.set(1);
  }

  setSortField(field: 'nombre' | 'marca' | 'modelo' | 'ambientecodigo'): void {
    if (this.sortField() === field) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
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
