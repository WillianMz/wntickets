import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Icompany } from './../models/icompany';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService{

  constructor( private http: HttpClient) {
    super();
  }

  save(company: Icompany) {
    if(company.id){
      return this.update(company);
    }
    else{
      return this.create(company);
    }
  }

  getAll(): Observable<Icompany[]>{
    return this.http.get<Icompany[]>(`${environment.api2}/empresa`)
                    .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getById(id: number): Observable<Icompany> {
    return this.http.get<Icompany>(`${environment.api2}/empresa/${id}`)
                    .pipe(map(this.extractData), catchError(this.serviceError));
  }

  activate(id: number) {
    /* return this.http.put(`${environment.api2}/empresa/ativadesativa/${id}`,)
                    .pipe(map(this.extractData), catchError(this.serviceError)); */

    return this.http.put(`${environment.api2}/empresa/ativadesativa/${id}`, this.getHeaderJson())
                    .pipe(map(this.extractData), catchError(this.serviceError));
  }

  private create(company: Icompany) {
    return this.http.post(`${environment.api2}/empresa`, company, this.getHeaderJson())
                    .pipe(map(this.extractData), catchError(this.serviceError));
  }

  private update(company: Icompany) {
    return this.http.put(`${environment.api2}/empresa`, company, this.getHeaderJson())
                    .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
