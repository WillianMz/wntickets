import { CategoriaModel } from './../models/sector/categoriaModel';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public save(categoria: CategoriaModel){
    if(categoria.Id){
      console.log(categoria);
      return this.update(categoria);
    }
    else {
      return this.create(categoria);
    }
  }

  private create(categoria: CategoriaModel){
    return this.http.post(`${environment.api}/categoria`, categoria);
  }

  private update(categoria: CategoriaModel){
    return this.http.put(`${environment.api}/categoria/`, categoria);
  }

  public getAll(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${environment.api}/categoria`);
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

  public getById(id: number): Observable<CategoriaModel>{
    return this.http.get<CategoriaModel>(`${environment.api}/categoria/${id}`);
  }

  public getDisable(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${environment.api}/categoria/disable`);
  }

  public getBySector(sectorId: number, enable: boolean): Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${environment.api}/categoria/${sectorId}/${enable}`);
  }

  public getBySectorAndName(sectorId: number, nome: string, enable?: boolean): Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${environment.api}/categoria/${nome}/${sectorId}/${enable}`);
  }

  public getByName(nome: string): Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${environment.api}/categoria/procurar/${nome}`);
  }

}
