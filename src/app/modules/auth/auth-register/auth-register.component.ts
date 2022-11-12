import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErroServidor } from 'src/app/models/erroServidor';
import { NotificationService } from 'src/app/services/notification.service';
import { CadastroUsuarioRequest } from 'src/app/models/user/cadastroUsuarioRequest.model';
import { CadastroUsuarioResponse } from 'src/app/models/user/cadastroUsuarioResponse.model';
import { FormValidations } from 'src/app/functions/form-validations';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  message: string;
  success: boolean;
  erros: ErroServidor[];

  tituloPagina: string = 'Novo usuário';
  userForm: FormGroup;
  cadastroUsuarioResponse: CadastroUsuarioResponse;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    let newUser = new CadastroUsuarioRequest;
    newUser.email = '';
    newUser.nome = '';
    newUser.senha = '';
    newUser.senhaConfirmacao = '';

    this.startForm(newUser);
  }

  ngOnInit(): void {
  }

  //GETS
  get email() {
    return this.userForm.get('email');
  }

  get nome() {
    return this.userForm.get('nome');
  }

  get senha() {
    return this.userForm.get('senha');
  }

  get confirmarSenha() {
    return this.userForm.get('confirmarSenha');
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  public salvar(){
    let usuario = new CadastroUsuarioRequest();
    usuario.email = this.email?.value;
    usuario.nome = this.nome?.value;
    usuario.senha = this.senha?.value;
    usuario.senhaConfirmacao = this.confirmarSenha?.value;
    console.log(usuario);

    this.loginService.criarContaDeUsuario(usuario).subscribe({
      next: (response) => {
        if(response){
          this.cadastroUsuarioResponse = response;
          if(this.cadastroUsuarioResponse.sucesso == true){
            this.notificationService.showSuccess('Conta de usuário criada com sucesso!','Novo Usuário');
            this.router.navigate(['/login/ativar'], {queryParams: { email: usuario.email}});
            //this.router.navigate(['/login']);
          }
          else if(response.sucesso == false){
            console.log(response.erros);
            this.cadastroUsuarioResponse.erros = response.erros;
            this.notificationService.showError('Erro ao criar conta de usuário. Tente novamente!','Novo usuário');
          }
        }
      },
      error: (err) => {
        console.log('aqui: ' + err.error);
        //console.log(`Erro ${JSON.stringify(err.error)}`)
        /* 
        {
          "sucesso": false,
          "erros": [
            "Passwords must have at least one lowercase ('a'-'z')."
          ]
        }
        {
          "errors": {
            "SenhaConfirmacao": [
              "As senhas devem ser iguais"
            ]
          },
          "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
          "title": "One or more validation errors occurred.",
          "status": 400,
          "traceId": "00-37f8dda22b5e51b8891a6227b7e54b5d-4a4ab1ca4f500327-00"
        }
        */
      }
    })
  }

  private startForm(usuario: CadastroUsuarioRequest){
    this.userForm = this.formBuilder.group({
      email: [usuario.email, [
        Validators.required,
        Validators.email
      ]],
      nome: [usuario.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      senha: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,50}')]],
      confirmarSenha: [null, [FormValidations.equalsTo('senha')]]
    });
    
    this.userForm.controls['senha'].valueChanges.forEach(() => {
      this.userForm.controls['confirmarSenha'].updateValueAndValidity();
    })
  }
}
