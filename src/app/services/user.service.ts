import { Observable } from 'rxjs';
import { RoleRequest } from './../models/user/roleRequest.model';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ENDERECO_API: string = `${environment.api}/api/usuario`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  public criarRole(role: RoleRequest) : Observable<any>{
    return this.http.post(ENDERECO_API, role);
  }

  /* ublic create(usuario: NovoUsuarioModel) {
    return this.http.post(`${this.url}`, usuario);
  }

  public update(usuario: EditarUsuarioModel) {
    return this.http.put(`${this.url}`, usuario);
  }

  public getAll(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.url);
  }

  public delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
 */
  /* public password(alterarSenha: AlterarSenhaModel) {
    return this.http.put(`${this.url}/password`, alterarSenha);
  }

  public disable(id: number) {
    return this.http.put(`${this.url}/${id}/disable`, null);
  }

  public checkLogin(login: string) {
    return this.http.get(`${this.url}/checklogin/${login}`);
  }
 */
 /*  public checkEmail(email: string) {
    return this.http.get(`${this.url}/checkemail/${email}`);
  }

  public getDesativados(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.url}/disable`);
  }

  public getDetail(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.url}/${id}/details`);
  } */

 /*  public getById(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.url}/${id}`);
  } */



  /* //NOVAS ROTAS ***********************************************
  public criarContaDeUsuario(novaConta: CadastroUsuarioRequest): Observable<CadastroUsuarioResponse>{
    return this.http.post(this.caminhoApi, novaConta);
  }

  public efetuarLogin(login: LoginRequest): Observable<LoginResponse> {    
    return this.http.post(`${this.caminhoApi}/login`, login);
  }

  getToken() {
    const token = window.localStorage.getItem('wntickets');
    return token;
  } */

  /* obterDataExpiracaoToken(token: string): Date {
    const decoded: any = jwt_decode.default(token);

    if(decoded.exp === undefined){
      return new Date;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
 */
  /* tokenExpirado(token?:string) : boolean {
    if(!token){
      return true;
    }

    const date = this.obterDataExpiracaoToken(token);
    if(date === undefined){
      return false;
    }

    //data do token é maior que a data atual?
    //se nao for esta expirado
    return !(date.valueOf() > new Date().valueOf());
  }

  usuarioEstaLogado() {
    const token = this.getToken();
    if(!token){
      return false;
    }
    else if(this.tokenExpirado(token)){
      return false;
    }

    return true;
  } */
}
