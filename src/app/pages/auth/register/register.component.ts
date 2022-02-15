import { UsuarioDTO } from './../../../models/user/usuarioDTO';
import { NovoUsuarioDTO } from './../../../models/user/novoUsuarioDTO';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErroServidor } from 'src/app/models/erroServidor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const user = new NovoUsuarioDTO();
   /*  user.Nome = '';
    user.Sobrenome = '';
    user.Login = '';
    user.Senha = '';
    user.ConfirmarSenha = ''; */
    this.startForm(user);
  }

  ngOnInit(): void {
  }

  get nome(){
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

  private startForm(user: NovoUsuarioDTO) {
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
    let user = new NovoUsuarioDTO();
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


  }

}
