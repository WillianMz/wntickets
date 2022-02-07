import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Isector } from '../models/isector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) {}

  private handleError<T>(operacao: string, result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

  save(isector: Isector){
    if(isector.id){
      console.log(isector);
      return this.update(isector);
    }
    else {
      return this.create(isector);
    }
  }

  private create(isector: Isector){
    return this.http.post(`${environment.api}/setor`, isector);
  }

  private update(isector: Isector){
    return this.http.put(`${environment.api}/setor`, isector);
  }

  getAll(): Observable<Isector[]>{
    return this.http.get<Isector[]>(`${environment.api}/setor`)
    //.pipe(catchError(this.handleError<Result>('getAll')));
  }

  delete(id: number){
    return this.http.delete(`${environment.api}/setor/${id}`);
  }

  getById(id: number): Observable<Isector>{
    return this.http.get(`${environment.api}/setor/${id}`);
  }

  disable(id: number){
    return this.http.put(`${environment.api}/setor/${id}/inativar`, null);
  }

  enable(id: number) {
    return this.http.put(`${environment.api}/setor/${id}/ativar`, null);
  }

  disabled(): Observable<Isector[]>{
    return this.http.get<Isector[]>(`${environment.api}/setor/desativados`);
  }

  getByName(nome: string): Observable<Isector[]> {
    return this.http.get<Isector[]>(`${environment.api}/setor/${nome}`);
  }
}
