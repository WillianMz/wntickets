import { LoginService } from './../../../services/login.service';
import { LoginRequest } from './../../../models/auth/loginRequest.model';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { ErroServidor } from './../../../models/erroServidor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  loginForm:  FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NotificationService,
    private loginService: LoginService
  ) {
    const login = new LoginRequest();
    login.email = "";
    login.senha = "";
    this.startForm(login);
  }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get senha(){
    return this.loginForm.get('senha');
  }

  public entrar(){
    let login = new LoginRequest;
    login.email = this.email?.value;
    login.senha = this.senha?.value;

    this.loginService.fazerLogin(login).subscribe({
      next: (response) => {
        if(response?.sucesso == true) {
          this.loginService.salvarToken(response.token);
          this.router.navigate(['']);
        }
      }
    });
  }

  private startForm(login: LoginRequest) {
    this.loginForm = new FormGroup({
      email: new FormControl(login.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(200)
      ]),
      senha: new FormControl(login.senha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }
}
