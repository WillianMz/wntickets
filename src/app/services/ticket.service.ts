import { TicketModel } from './../models/ticket/ticketModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  /* private url = `${environment.api}/ticket`; */

  constructor(private http: HttpClient) { }

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

  public delete(id: number){
    return this.http.delete(`${environment.api}/Ticket/${id}`);
  }

  public getAll(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(`${environment.api}/Ticket`)
  }



}
