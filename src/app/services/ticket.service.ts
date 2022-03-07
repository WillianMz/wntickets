import { TicketModel } from './../models/ticket/ticketModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private url = `${environment.api}/ticket`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<TicketModel[]> {
    return this.http.get<TicketModel[]>(this.url);
  }
}
