import { TipoEquiModel } from './../models/equipment/tipoEquipModel';
import { NovoEquipamentoModel } from './../models/equipment/novoEquipamentoModel';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EquipamentoModel } from '../models/equipment/equipamentoModel';

const ENDERECO_API: string = `${environment.api}/equipamento`;

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) {}

  public getBySetor(setor: number, ativo: boolean) : Observable<EquipamentoModel[]>{
    return this.http.get<EquipamentoModel[]>(`${ENDERECO_API}/setor?setorId=${setor}&ativo=${ativo}`)
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
    return this.http.get(`${environment.api}/equipamento/${id}`);
  }

  public disable(id: number){
    return this.http.put(`${environment.api}/Equipamento/${id}/desativar`, null);
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
    return this.http.get<EquipamentoModel[]>(`${environment.api}/Equipamento/nome?nome=${nome}`);
  }

  //NOVAS ROTAS
  public adicionar(equipamento: EquipamentoModel){
    return this.http.post(`${environment.api}/equipamento`, equipamento);
  }

  public editar(equipamento: EquipamentoModel){
    return this.http.put(`${environment.api}/equipamento`, equipamento);
  }

  //TIPOS DE EQUIPAMENTOS
  public getTipos(ativo: boolean): Observable<TipoEquiModel[]>{
    return this.http.get<TipoEquiModel[]>(`${environment.api}/equipamento/tipo?ativo=${ativo}`);
  }

  public getTipoById(id: number): Observable<TipoEquiModel>{
    return this.http.get<TipoEquiModel>(`${environment.api}/equipamento/tipo/${id}`);
  }

  private createTipo(equipType: TipoEquiModel){
    return this.http.post(`${environment.api}/Equipamento/tipo`, equipType);
  }

  private updateTipo(equipType: TipoEquiModel){
    return this.http.put(`${environment.api}/Equipamento/tipo`, equipType);
  }

  public enableTipo(equipType: TipoEquiModel){
    return this.updateTipo(equipType);
  }

  public disableTipo(equipType: TipoEquiModel){
    return this.updateTipo(equipType);
  }

  saveTipo(tipoEquip: TipoEquiModel){
    if(tipoEquip.id){
      return this.updateTipo(tipoEquip);
    }
    else {
      return this.createTipo(tipoEquip);
    }
  }

  public disabledTipo(): Observable<TipoEquiModel[]>{
    return this.http.get<TipoEquiModel[]>(`${environment.api}/Equipamento/Tipo?ativo=false`);
  }
}
