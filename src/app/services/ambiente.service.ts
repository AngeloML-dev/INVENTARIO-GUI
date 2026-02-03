import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { supabase } from '../supabase';
import { Ambiente, AmbienteForm } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {
  private readonly tableName = 'ambiente';

  getAll(): Observable<Ambiente[]> {
    return from(supabase
      .from(this.tableName)
      .select('*')
      .order('id', { ascending: true }))
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Ambiente[];
      }));
  }

  getById(id: number): Observable<Ambiente> {
    return from(supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Ambiente;
      }));
  }

  create(data: AmbienteForm): Observable<Ambiente> {
    return from(supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Ambiente;
      }));
  }

  update(id: number, data: AmbienteForm): Observable<Ambiente> {
    return from(supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single())
      .pipe(map(response => {
        if (response.error) throw new Error(response.error.message);
        return response.data as Ambiente;
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
