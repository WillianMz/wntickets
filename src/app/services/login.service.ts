import { Usuario } from './../models/user/usuario.model';
import { LoginRequest } from './../models/auth/loginRequest.model';
import { LoginResponse } from './../models/auth/loginResponse.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { CadastroUsuarioRequest } from '../models/user/cadastroUsuarioRequest.model';
import { Observable } from 'rxjs';
import { CadastroUsuarioResponse } from '../models/user/cadastroUsuarioResponse.model';

import * as jwt_decode from 'jwt-decode';

const CHAVE_TOKEN: string = "wntickets";
const ENDERECO_API: string = `${environment.api}/api/usuario`;


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
 
  //OK
  criarContaDeUsuario(novaConta: CadastroUsuarioRequest): Observable<CadastroUsuarioResponse | null>{
    return this.http.post(ENDERECO_API, novaConta);
  }

  //OK
  fazerLogin(login: LoginRequest): Observable<LoginResponse | null>{
    return this.http.post(`${ENDERECO_API}/login`, login);
  }

  fazerLogout(){
    delete localStorage[CHAVE_TOKEN];
  }

  //OK
  obterToken(){
    const token = localStorage.getItem(CHAVE_TOKEN);
    if(token){
      this.usuarioLogado(token);
      return token;
    }
    else  
      return null;
  }
  
  //OK
  salvarToken(token: string){
    localStorage.setItem(CHAVE_TOKEN, token);
  }

  //OK
  usuarioLogado(token: string) : Usuario {
    const decoded: any = jwt_decode.default(token);
    let usuario = new Usuario();
    usuario.email= decoded.email;
    usuario.nome = decoded.name;
    usuario.perfil = decoded.role;
    console.log('Usuario: ' + usuario.nome+ usuario.email + usuario.perfil);
    return usuario;
  }
}
