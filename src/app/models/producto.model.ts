export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  cantidad: number;
  precio: number;
  categoria?: string;
  fechaCreacion?: Date;
}

export type ProductoForm = Omit<Producto, 'id' | 'fechaCreacion'>;
