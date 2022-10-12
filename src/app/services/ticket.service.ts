import { ChamadoRequest } from './../models/ticket/chamadoRequest.model';
import { TicketModel } from './../models/ticket/ticketModel';
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

  public chamadoEquipamento(chamado: ChamadoRequest) {
    return this.http.post(`${ENDERECO_API}/equipamento`, chamado);
  }

  public delete(id: number){
    return this.http.delete(`${ENDERECO_API}/${id}?chamadoId=${id}`);
  }









  //REMOVER ESTES ABAIXO

  save(ticket: TicketModel){
    if(ticket.id){
      console.log(ticket);
      return this.update(ticket);
    }
    else {
      return this.create(ticket);
    }
  }

  private create(ticket: TicketModel){
    return this.http.post(`${environment.api}/Ticket`, ticket);
  }

  private update(iticket: TicketModel){
    return this.http.put(`${environment.api}/Ticket`, iticket);
  }

  /* public delete(id: number){
    return this.http.delete(`${environment.api}/Ticket/${id}`);
  } */

  public getAll(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(`${environment.api}/Ticket`)
  }

  public editar(ticket: TicketModel){
    return this.http.put(`${environment.api}/Ticket`, ticket);
  }

}
