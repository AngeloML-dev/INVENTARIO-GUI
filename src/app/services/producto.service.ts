import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { supabase } from '../supabase';
import { Producto, ProductoForm } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly tableName = 'productos';

  getAll(): Observable<Producto[]> {
    return from(supabase
      .from(this.tableName)
      .select('*')
      .order('id', { ascending: true }))
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Producto[];
      }));
  }

  getById(id: number): Observable<Producto> {
    return from(supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Producto;
      }));
  }

  create(data: ProductoForm): Observable<Producto> {
    return from(supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Producto;
      }));
  }

  update(id: number, data: ProductoForm): Observable<Producto> {
    return from(supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Producto;
      }));
  }

  delete(id: number): Observable<void> {
    return from(supabase
      .from(this.tableName)
      .delete()
      .eq('id', id))
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return void 0;
      }));
  }
}
