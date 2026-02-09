export interface Ambiente {
  id?: number;
  codigo: string;
  nombre: string;
  ubicacion: string;
}

export interface Equipo {
  id?: number;
  codigoid?: string;  // ID personalizado del equipo (DNI único, opcional)
  nombre: string;
  descripcion?: string;
  piso?: string;
  categoria?: string;
  marca: string;
  modelo: string;
  estado: string;
  ambientecodigo?: string;
  ambientenombre?: string;
}

// Categorías de equipos
export const CATEGORIAS_EQUIPO = [
  'Micrófonos',
  'Parlantes',
  'Teclados',
  'Mouse'
];

export type EquipoForm = Omit<Equipo, 'id'>;

export type AmbienteForm = Omit<Ambiente, 'id'>;
