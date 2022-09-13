import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EquipamentoModel } from '../models/equipment/equipamentoModel';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) {}

  private handleError<T>(operacao: string, result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

  save(equipamento: EquipamentoModel){
    if(equipamento.id){
      console.log(equipamento);
      return this.update(equipamento);
    }
    else {
      return this.create(equipamento);
    }
  }

  private create(equipamento: EquipamentoModel){
    return this.http.post(`${environment.api}/Equipamento`, equipamento);
  }

  private update(iequip: EquipamentoModel){
    return this.http.put(`${environment.api}/Equipamento`, iequip);
  }

  public delete(id: number){
    return this.http.delete(`${environment.api}/Equipamento/${id}`);
  }
  
  public getAll(): Observable<EquipamentoModel[]>{
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento`)
    //.pipe(catchError(this.handleError<Result>('getAll')));
  }

  public getById(id: number): Observable<EquipamentoModel>{
    return this.http.get(`${environment.api}/Equipamento/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${environment.api}/Equipamento/${id}/inativar`, null);
  }

  public enable(id: number) {
    return this.http.put(`${environment.api}/Equipamento/${id}/ativar`, null);
  }

  public disabled(): Observable<EquipamentoModel[]>{
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento?ativo=false`);
  }

  public enabled(): Observable<EquipamentoModel[]>{
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento?ativo=true`);
  }

  public getByName(nome: string): Observable<EquipamentoModel[]> {
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento/GetByName?nome=${nome}`);
  }
}
