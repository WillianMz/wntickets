import { environment } from './../../environments/environment';
import { Icategory } from './../models/icategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(icategory: Icategory){
    if(icategory.id){
      console.log(icategory);
      return this.update(icategory);
    }
    else {
      return this.create(icategory);
    }
  }

  getAll(): Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${environment.api}/categorias`);
  }

  getById(id: number): Observable<Icategory>{
    return this.http.get<Icategory>(`${environment.api}/categorias/${id}`).pipe(map(this.extractData), catchError(this.serviceError));
  }

  getBySector(idSector: number): Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${environment.api}/categorias?sectorID=${idSector}`);
  }

  private create(icategory: Icategory){
    return this.http.post(`${environment.api}/categorias`, icategory);
  }

  private update(icategory: Icategory){
    return this.http.put(`${environment.api}/categorias/${icategory.id}`, icategory);
  }

}
