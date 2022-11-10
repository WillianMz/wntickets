import { RecuperarSenha } from './../../../models/user/recuperarSenha.model';
import { NotificationService } from './../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  email: string;
  tokenURL: string;
  sucesso: boolean;
  mensagem: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NotificationService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { 
    this.validarFormulario();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.email = params.email;
        this.tokenURL = params.token;
      }
    );
  }

  get token() {
    return this.novaSenhaForm.get('token');
  }

  get senha() {
    return this.novaSenhaForm.get('senha');
  }

  get confirmarSenha() {
    return this.novaSenhaForm.get('confirmarSenha');
  }

  voltar() {
    this.router.navigate(['/login']);
  }

  confirmar(){
    const recuperar = new RecuperarSenha();
    recuperar.email = this.email;
    console.log(this.email);
    recuperar.token = this.token?.value;
    console.log(this.token);
    recuperar.novaSenha = this.senha?.value;
    this.userService.recuperarSenha(recuperar).subscribe({
      next: (response) => {
        if(response){
          this.sucesso = response['sucesso'];
          this.mensagem = response['mensagem'];
          if(this.sucesso){
            this.notification.showSuccess(this.mensagem);
            this.router.navigate(['/login']);
          }
          else{
            this.notification.showInfo(this.mensagem);
          }
        }
      }
    })
  }

  private validarFormulario(){
    this.novaSenhaForm = this.formBuilder.group({
      senha: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,50}')]],
      confirmarSenha: [null, [FormValidations.equalsTo('senha')]],
      token: [null, [Validators.required]]
    });
    
    this.novaSenhaForm.controls['senha'].valueChanges.forEach(() => {
      this.novaSenhaForm.controls['confirmarSenha'].updateValueAndValidity();
    });
  }

}
