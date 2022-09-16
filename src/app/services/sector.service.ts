import { SetorModel } from './../models/sector/setorModel';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  save(setor: SetorModel){
    if(setor.id){
      console.log(setor);
      return this.update(setor);
    }
    else {
      return this.create(setor);
    }
  }

  private create(setor: SetorModel){
    return this.http.post(`${environment.api}/Setor`, setor);
  }

  private update(isector: SetorModel){
    return this.http.put(`${environment.api}/Setor`, isector);
  }

  public delete(id: number){
    return this.http.delete(`${environment.api}/Setor/${id}`);
  }

  public getAll(): Observable<SetorModel[]>{
    return this.http.get<SetorModel[]>(`${environment.api}/Setor`)
  }

  public getById(id: number): Observable<SetorModel>{
    return this.http.get(`${environment.api}/Setor/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${environment.api}/Setor/${id}/disable`, null);
  }

  public enable(id: number) {
    return this.http.put(`${environment.api}/Setor/${id}/enable`, null);
  }

  public disabled(): Observable<SetorModel[]>{
    return this.http.get<SetorModel[]>(`${environment.api}/Setor?ativo=false`);
  }

  public enabled(): Observable<SetorModel[]>{
    return this.http.get<SetorModel[]>(`${environment.api}/Setor?ativo=true`);
  }

  public getByNome(nome: string): Observable<SetorModel[]> {
    return this.http.get<SetorModel[]>(`${environment.api}/Setor/GetByNome?nome=${nome}`);
  }
}
