import { AnexoRequest } from './../models/ticket/anexoRequest.model';
import { FinalizarRequest } from './../models/ticket/finalizarRequest.model';
import { CancelarRequest } from './../models/ticket/cancelarRequest.model';
import { ChamadoResponse } from './../models/ticket/chamadoResponse.model';
import { ChamadoRequest } from './../models/ticket/chamadoRequest.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ENDERECO_API: string = `${environment.api}/ticket`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  public salvar(chamado: ChamadoRequest) {
    if(chamado.ticketId){
      return this.http.put(`${ENDERECO_API}`, chamado);
    }
    else{
      return this.http.post(`${ENDERECO_API}/ticket`, chamado);  
    }
  }

  public getAll(): Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/`)
  }

  public chamadoEquipamento(chamado: ChamadoRequest) {
    return this.http.post(`${ENDERECO_API}/equipamento`, chamado);
  }

  public cancelar(motivo: CancelarRequest){
    return this.http.put(`${ENDERECO_API}/cancelar`, motivo);
  }
  
  public finalizar(solucao: FinalizarRequest) {
    return this.http.put(`${ENDERECO_API}/finalizar`, solucao);
  }
  
  public delete(id: number){
    return this.http.delete(`${ENDERECO_API}/${id}`);
  }  

  public getById(id: number): Observable<ChamadoResponse> {
    return this.http.get<ChamadoResponse>(`${ENDERECO_API}/${id}`);
  }

  public anexarArquivo(anexo: AnexoRequest){
    return this.http.post(`${ENDERECO_API}/anexo`, anexo);
  }

  public removerAnexo(anexo: number){
    return this.http.delete(`${ENDERECO_API}/anexo/${anexo}`);
  }

  public fazerVerificacoes(){
    return this.http.post(`${ENDERECO_API}/verificar`, null);
  }

  // FILTROS

  public getBySetor(setor: number) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/setor?setorId=${setor}`);
  }

  public getByTipo(tipo: number) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/tipo?tipoId=${tipo}`);
  }

  public getByAssunto(assunto: string) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/assunto?assunto=${assunto}`);
  }

  public getByDescricao(descricao: string) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/descricao?descricao=${descricao}`);
  }

  public getBySolucao(solucao: string) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/solucao?solucao=${solucao}`);
  }

  public getByCriador(criador: number) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/criador?criadorId=${criador}`);
  }

  public getByPrioridade(prioridade: number) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/prioridade?prioridadeId=${prioridade}`);
  }

  public getByStatus(status: number) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/status?statusId=${status}`);
  }

  public getByOperador(operador: number) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/operador?operadorId=${operador}`);
  }

  public getByAberto(aberto: string) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/aberto?abertoEm=${aberto}`);
  }

  public getByFechado(fechado: string) : Observable<ChamadoResponse[]>{
    return this.http.get<ChamadoResponse[]>(`${ENDERECO_API}/fechado?fechadoEm=${fechado}`);
  }

}
