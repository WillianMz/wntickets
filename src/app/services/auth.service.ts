import { UsuarioModel } from './../models/user/usuarioModel';
import { LoginModel } from './../models/auth/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.api}/login`

  constructor(
    private http: HttpClient
  ) { }

  public login(login: LoginModel){
    return this.http.post<UsuarioModel>(`${this.url}`, login)
      .do(res => this.setSession)
  }

  public logout(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(){
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  //armazena o JWT diretamente no LocalStorage
  private setSession(authResult: any){
    const expireAt = moment().add(authResult.expireIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expireAt.valueOf()));
  }

}
