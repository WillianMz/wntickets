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
    if(setor.Id){
      console.log(setor);
      return this.update(setor);
    }
    else {
      return this.create(setor);
    }
  }

  private create(setor: SetorModel){
    return this.http.post(`${environment.api}/setor`, setor);
  }

  private update(isector: SetorModel){
    return this.http.put(`${environment.api}/setor`, isector);
  }

  public getAll(): Observable<SetorModel[]>{
    return this.http.get<SetorModel[]>(`${environment.api}/Setor?ativo=true`)
  }

  public delete(id: number){
    return this.http.delete(`${environment.api}/setor/${id}`);
  }

  public getById(id: number): Observable<SetorModel>{
    return this.http.get(`${environment.api}/setor/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${environment.api}/setor/${id}/inativar`, null);
  }

  public enable(id: number) {
    return this.http.put(`${environment.api}/setor/${id}/ativar`, null);
  }

  public disabled(): Observable<SetorModel[]>{
    return this.http.get<SetorModel[]>(`${environment.api}/setor/desativados`);
  }

  public getByNome(nome: string): Observable<SetorModel[]> {
    return this.http.get<SetorModel[]>(`${environment.api}/setor/GetByNome?nome=${nome}`);
  }
}
