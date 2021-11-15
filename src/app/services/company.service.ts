import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Icompany } from './../models/icompany';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http: HttpClient) { }

  getAll(): Promise<Icompany[]>{
    return this.http.get<Icompany[]>(`${environment.api}/empresas`).toPromise();
  }

}
