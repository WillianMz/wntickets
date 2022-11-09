import { RecuperarSenha } from './../../../models/user/recuperarSenha.model';
import { NotificationService } from './../../../services/notification.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormValidations } from 'src/app/functions/form-validations';

@Component({
  selector: 'app-auth-new-password',
  templateUrl: './auth-new-password.component.html',
  styleUrls: ['./auth-new-password.component.css']
})
export class AuthNewPasswordComponent implements OnInit {

  novaSenhaForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NotificationService,
    private formBuilder: FormBuilder
  ) { 
    this.validarFormulario();
  }

  ngOnInit(): void {
  }

  get senha() {
    return this.novaSenhaForm.get('senha');
  }

  get confirmarSenha() {
    return this.novaSenhaForm.get('confirmarSenha');
  }

  private validarFormulario(){
    this.novaSenhaForm = this.formBuilder.group({
      senha: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,50}')]],
      confirmarSenha: [null, [FormValidations.equalsTo('senha')]]
    });
    
    this.novaSenhaForm.controls['senha'].valueChanges.forEach(() => {
      this.novaSenhaForm.controls['confirmarSenha'].updateValueAndValidity();
    });
  }

}
