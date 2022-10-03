import { SetorResponse } from './../models/sector/setorResponse.model';
import { SetorModel } from './../models/sector/setorModel';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ENDERECO_API: string = `${environment.api}/setor`;

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) {}

  public create(setor: SetorModel){
    return this.http.post(`${ENDERECO_API}`, setor);
  }

  public update(isector: SetorModel){
    return this.http.put(`${ENDERECO_API}`, isector);
  }

  public delete(id: number){
    return this.http.delete(`${ENDERECO_API}/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${ENDERECO_API}/${id}/disable`,null);
  }

  public enable(id: number) {
    return this.http.put(`${ENDERECO_API}/${id}/enable`, null);
  }

  public getAll(ativo: boolean): Observable<SetorModel[]>{
    return this.http.get<SetorModel[]>(`${ENDERECO_API}/?ativo=${ativo}`)
  }

  public getById(id: number): Observable<SetorModel>{
    return this.http.get(`${ENDERECO_API}/${id}`);
  }

  public getByNome(nome: string): Observable<SetorModel[]> {
    return this.http.get<SetorModel[]>(`${ENDERECO_API}/nome?nome=${nome}`);
  }

  public getAll1(ativo: boolean): Observable<SetorResponse[]>{
    return this.http.get<SetorResponse[]>(`${ENDERECO_API}/?ativo=${ativo}`)
  }
}
