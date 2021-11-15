import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Isector } from '../models/isector';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectorService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(isector: Isector){
    if(isector.id){
      console.log(isector);
      return this.update(isector);
    }
    else {
      return this.create(isector);
    }
  }

  getAll(): Observable<Isector[]>{
    //return this.http.get<Isector[]>(`${environment.api}/Setor`).pipe(map(this.extractData), catchError(this.serviceError));
    return this.http.get<Isector[]>(`${environment.api}/Setor`);
  }

  getById(id: number): Observable<Isector>{
    return this.http.get<Isector>(`${environment.api}/setor/${id}`).pipe(map(this.extractData), catchError(this.serviceError));
  }

  private create(isector: Isector){
    /* return this.http.post(`${environment.api}/setor`, isector, this.getHeaderJson())
                    .pipe(map(this.extractData), catchError(this.serviceError)); */
    return this.http.post(`${environment.api}/Setor`, isector);
  }

  private update(isector: Isector){
    /* return this.http.put(`${environment.api}/setor`, isector, this.getHeaderJson())
                    .pipe(map(this.extractData), catchError(this.serviceError)); */
    return this.http.put(`${environment.api}/Setor/${isector.id}`, isector);
  }
}
