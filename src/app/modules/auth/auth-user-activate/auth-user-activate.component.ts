import { AtivarUsuarioRequest } from './../../../models/user/ativarUsuarioRequest.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-auth-user-activate',
  templateUrl: './auth-user-activate.component.html',
  styleUrls: ['./auth-user-activate.component.css']
})
export class AuthUserActivateComponent implements OnInit {

  ativarForm: FormGroup;
  userEmail: string;
  codigoAtivacao: string;
  sucesso: boolean;
  mensagem: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService
  ) { 
    //this.validarFormulario('','');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.userEmail = params.email;
      }
    );

    this.validarFormulario(this.userEmail, '');
  }

  get email(){
    return this.ativarForm.get('email');
  }

  get codigo(){
    return this.ativarForm.get('codigo');
  }

  public validar(){
    const ativar = new AtivarUsuarioRequest();
    ativar.email = this.email?.value;
    ativar.codigo = this.codigo?.value;
    this.userService.ativarConta(ativar).subscribe({
      next: (response) => {
        if(response){
          this.sucesso = response['sucesso'];
          this.mensagem = response['mensagem'];

          if(this.sucesso){
            this.notification.showInfo(this.mensagem);
            this.router.navigate(['/login']);
          }
          else{
            this.notification.showWarning(this.mensagem);
          }
        }
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  solicitarCodigo(){
    this.userEmail = this.email?.value;
    this.userService.solicitarCodigo(this.userEmail).subscribe({
      next: (response) => {
        if(response){
          this.sucesso = response['sucesso'];
          this.mensagem  =response['mensagem'];

          if(this.sucesso){
            this.notification.showInfo(this.mensagem);
          }
          else{
            this.notification.showWarning(this.mensagem);
          }
        }
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  private validarFormulario(email: string, codigo: string){
    this.ativarForm = new FormGroup({
      email: new FormControl(email, [Validators.required]),
      codigo: new FormControl(codigo, [Validators.required])
    });
  }
}
