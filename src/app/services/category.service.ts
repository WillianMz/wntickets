import { environment } from './../../environments/environment';
import { Icategory } from './../models/icategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public save(icategory: Icategory){
    if(icategory.id){
      console.log(icategory);
      return this.update(icategory);
    }
    else {
      return this.create(icategory);
    }
  }

  private create(category: Icategory){
    return this.http.post(`${environment.api}/categoria`, category);
  }

  private update(category: Icategory){
    return this.http.put(`${environment.api}/categoria/`, category);
  }

  public getAll(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${environment.api}/categoria`);
  }

  public delete(id: number) {
    return this.http.delete(`${environment.api}/categoria/${id}/delete`);
  }

  public enable(id: number) {
    return this.http.put(`${environment.api}/categoria/${id}/enable`, null);
  }

  public disable(id: number) {
    return this.http.put(`${environment.api}/categoria/${id}/disable`, null);
  }

  public getById(id: number): Observable<Icategory>{
    return this.http.get<Icategory>(`${environment.api}/categoria/${id}`);
  }

  public getDisable(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(`${environment.api}/categoria/disable`);
  }

  public getBySector(sectorId: number, enable: boolean): Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${environment.api}/categoria/${sectorId}/${enable}`);
  }

  public getBySectorAndName(sectorId: number, nome: string, enable?: boolean): Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${environment.api}/categoria/${nome}/${sectorId}/${enable}`);
  }

  public getByName(nome: string): Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${environment.api}/categoria/procurar/${nome}`);
  }

}
