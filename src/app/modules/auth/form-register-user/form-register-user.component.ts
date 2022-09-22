import { NotificationService } from './../../../services/notification.service';
import { CadastroUsuarioRequest } from './../../../models/user/cadastroUsuarioRequest.model';
import { CadastroUsuarioResponse } from './../../../models/user/cadastroUsuarioResponse.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-form-register-user',
  templateUrl: './form-register-user.component.html',
  styleUrls: ['./form-register-user.component.css']
})
export class FormRegisterUserComponent implements OnInit {

  userForm: FormGroup;
  cadastroUsuarioResponse: CadastroUsuarioResponse;

  constructor(private userService: UserService, 
              private notificationService: NotificationService,
              //private router: Route
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
          //this.router.navigate(['/equipment']);
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

}
