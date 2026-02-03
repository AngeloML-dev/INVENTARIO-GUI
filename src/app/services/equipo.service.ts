import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { supabase } from '../supabase';
import { Equipo, EquipoForm } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private readonly tableName = 'equipo';

  getAll(): Observable<Equipo[]> {
    return from(supabase
      .from(this.tableName)
      .select('*')
      .order('id', { ascending: true }))
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Equipo[];
      }));
  }

  getById(id: number): Observable<Equipo> {
    return from(supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Equipo;
      }));
  }

  create(data: EquipoForm): Observable<Equipo> {
    return from(supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Equipo;
      }));
  }

  update(id: number, data: EquipoForm): Observable<Equipo> {
    return from(supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Equipo;
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
