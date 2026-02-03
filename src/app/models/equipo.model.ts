export interface Ambiente {
  id?: number;
  codigo: string;
  nombre: string;
  ubicacion: string;
}

export interface Equipo {
  id?: number;
  nombre: string;
  marca: string;
  modelo: string;
  estado: string;
  ambientecodigo?: string;
  ambientenombre?: string;
}

export type EquipoForm = Omit<Equipo, 'id'>;

export type AmbienteForm = Omit<Ambiente, 'id'>;
