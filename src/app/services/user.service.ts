import { AlterarSenhaDTO } from './../models/user/alterarSenhaDTO';
import { Observable } from 'rxjs';
import { EditarUsuarioDTO } from './../models/user/editarUsuarioDTO';
import { environment } from './../../environments/environment.prod';
import { NovoUsuarioDTO } from './../models/user/novoUsuarioDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../models/user/usuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.api}/usuario`;

  constructor(
    private http: HttpClient
  ) { }

  public create(usuario: NovoUsuarioDTO) {
    return this.http.post(`${this.url}`, usuario);
  }

  public update(usuario: EditarUsuarioDTO) {
    return this.http.put(`${this.url}`, usuario);
  }

  public getAll(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.url);
  }

  public delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public password(alterarSenha: AlterarSenhaDTO) {
    return this.http.put(`${this.url}/password`, alterarSenha);
  }

  public disable(id: number) {
    return this.http.put(`${this.url}/${id}/disable`, null);
  }

  public checkLogin(login: string) {
    return this.http.get(`${this.url}/checklogin/${login}`);
  }

  public checkEmail(email: string) {
    return this.http.get(`${this.url}/checkemail/${email}`);
  }

  public getDesativados(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.url}/disable`);
  }

  public getDetail(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.url}/${id}/details`);
  }

  public getById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.url}/${id}`);
  }

}
