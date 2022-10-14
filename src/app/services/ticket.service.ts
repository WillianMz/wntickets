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
      return this.http.put(`${ENDERECO_API}/ticket`, chamado);
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
  
  public finalizar(motivo: FinalizarRequest) {
    return this.http.put(`${ENDERECO_API}/finalizar`, motivo);
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
}
