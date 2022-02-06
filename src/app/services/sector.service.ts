import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Isector } from '../models/isector';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Result } from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) {}

  private handleError<T>(operacao: string, result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
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

  getAll(): Observable<Result>{
    return this.http.get<Result>(`${environment.api}/Setor`)
    .pipe(catchError(this.handleError<Result>('getAll')));
  }

  getById(id: number): Observable<Isector>{
    return this.http.get<Isector>(`${environment.api}/setor/${id}`);
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
