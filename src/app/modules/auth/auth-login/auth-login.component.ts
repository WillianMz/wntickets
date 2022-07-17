
import { Router } from '@angular/router';
import { LoginModel } from './../../../models/auth/loginModel';
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
    private router: Router,
    private notification: NotificationService
  ) {
    const login = new LoginModel();
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


  private startForm(login: LoginModel) {
    this.loginForm = new FormGroup({
      email: new FormControl(login.Email, [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(200)
      ]),
      senha: new FormControl(login.Senha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }
}
