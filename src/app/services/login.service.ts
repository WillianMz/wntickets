import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/auth/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${environment.api}/login`

  constructor(
    private http: HttpClient
  ) { }

  public auth(login: LoginModel) {

  }
}
