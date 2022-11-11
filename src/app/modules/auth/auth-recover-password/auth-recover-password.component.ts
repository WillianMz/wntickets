import { Router } from '@angular/router';
import { EsqueciMinhaSenha } from './../../../models/user/esqueciMinhaSenha.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-recover-password',
  templateUrl: './auth-recover-password.component.html',
  styleUrls: ['./auth-recover-password.component.css']
})
export class AuthRecoverPasswordComponent implements OnInit {

  recuperarForm: FormGroup;
  sucesso: boolean;
  mensagem: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { 
    this.validarFormulario('');
  }

  ngOnInit(): void {
  }

  get email(){
    return this.recuperarForm.get('email');
  }

  voltar(){
    this.router.navigate(['/login']);
  }

  solicitar(){
    const solicitacao = new EsqueciMinhaSenha();
    solicitacao.email = this.email?.value;

    this.userService.esqueciMinhaSenha(solicitacao).subscribe({
      next: (response) => {
        if(response){
          this.sucesso = response['sucesso'];
          this.mensagem = response['mensagem'];
        }
      }
    })
  }

  private validarFormulario(email: string){
    this.recuperarForm = new FormGroup({
      email: new FormControl(email, [
        Validators.required,
        Validators.email
      ])
    });
  }

}
