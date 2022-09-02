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
    if(equipamento.Id){
      console.log(equipamento);
      return this.update(equipamento);
    }
    else {
      return this.create(equipamento);
    }
  }

  private create(equipamento: EquipamentoModel){
    return this.http.post(`${environment.api}/equipamento`, equipamento);
  }

  private update(iequipamento: EquipamentoModel){
    return this.http.put(`${environment.api}/equipamento`, iequipamento);
  }

  public getAll(): Observable<EquipamentoModel[]>{
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento?ativo=true`)
    //.pipe(catchError(this.handleError<Result>('getAll')));
  }

  public delete(id: number){
    return this.http.delete(`${environment.api}/equipamento/${id}`);
  }

  public getById(id: number): Observable<EquipamentoModel>{
    return this.http.get(`${environment.api}/equipamento/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${environment.api}/equipamento/${id}/inativar`, null);
  }

  public enable(id: number) {
    return this.http.put(`${environment.api}/equipamento/${id}/ativar`, null);
  }

  public disabled(): Observable<EquipamentoModel[]>{
    return this.http.get<EquipamentoModel[]>(`${environment.api}/equipamento/desativados`);
  }

  public getByName(nome: string): Observable<EquipamentoModel[]> {
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento/GetByName?nome=${nome}`);
  }
}
