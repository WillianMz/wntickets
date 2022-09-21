import { NovoUsuarioModel } from './../../../models/user/novoUsuarioModel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErroServidor } from 'src/app/models/erroServidor';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CadastroUsuarioRequest } from 'src/app/models/user/cadastroUsuarioRequest.model';
import { CadastroUsuarioResponse } from 'src/app/models/user/cadastroUsuarioResponse.model';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  message: string;
  success: boolean;
  erros: ErroServidor[];

  userForm: FormGroup;
  cadastroUsuarioResponse: CadastroUsuarioResponse;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    let newUser = new CadastroUsuarioRequest;
    newUser.email = '';
    newUser.nome = '';
    newUser.telefone = '';
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

  get telefone() {
    return this.userForm.get('telefone');
  }

  get senha() {
    return this.userForm.get('senha');
  }

  get confirmarSenha() {
    return this.userForm.get('confirmaSenha');
  }

  public salvar(){
    let usuario = new CadastroUsuarioRequest();
    usuario.email = this.email?.value;
    usuario.nome = this.nome?.value;
    usuario.telefone = this.telefone?.value;
    usuario.senha = this.senha?.value;
    usuario.senhaConfirmacao = this.confirmarSenha?.value;
    console.log(usuario);

    this.userService.criarContaDeUsuario(usuario).subscribe({
      next: (response) => {
        this.cadastroUsuarioResponse = response;
        console.log(response);
        if(this.cadastroUsuarioResponse.sucesso == true){
          this.notificationService.showSuccess('Conta de usuário criada com sucesso!','Novo Usuário');
          this.router.navigate(['/login']);
        }
        else{
          this.notificationService.showError('Erro ao criar conta de usuário. Tente novamente!','Novo usuário');
        }

      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  private startForm(usuario: CadastroUsuarioRequest){
    this.userForm = new FormGroup({
      email: new FormControl(usuario.email, Validators.required),
      nome: new FormControl(usuario.nome, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      telefone: new FormControl(usuario.telefone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      senha: new FormControl(usuario.senha, [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(150)
      ]),
      confirmaSenha: new FormControl(usuario.senhaConfirmacao, [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(150)
      ])
    });
  }

 /*  get nome(){
    return this.userForm.get('nome');
  }

  get sobrenome(){
    return this.userForm.get('sobrenome');
  }

  get email(){
    return this.userForm.get('email');
  }

  get login(){
    return this.userForm.get('login');
  }

  get senha(){
    return this.userForm.get('password');
  }

  get confirSenha(){
    return this.userForm.get('confirmPassword');
  }

  private startForm(user: NovoUsuarioModel) {
    this.userForm = new FormGroup({
      nome: new FormControl(user.Nome, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40)
      ]),
      sobrenome: new FormControl(user.Sobrenome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      email: new FormControl(user.Email, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.email
      ]),
      login: new FormControl(user.Login, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      password: new FormControl(user.Senha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      confirmPassword: new FormControl(user.ConfirmarSenha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

  save(){
    let user = new NovoUsuarioModel();
    user.Nome = this.nome?.value;
    user.Sobrenome = this.sobrenome?.value;
    user.Email = this.email?.value;
    user.Login = this.login?.value;
    user.Senha = this.senha?.value;
    user.ConfirmarSenha = this.confirSenha?.value;
    console.log(user);

    this.userService.create(user).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message,'Nova conta de usuário');
          this.router.navigate(['/auth/activate']);
        }
        else {
          this.showError(this.message, 'Erro ao registar novo usuário');
        }
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro!');
      }
    })
  } */

}
