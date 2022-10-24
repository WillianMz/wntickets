import { NotificationService } from './../../../services/notification.service';
import { LoginService } from './../../../services/login.service';
import { Uf } from './../../../models/pessoa/uf.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaService } from './../../../services/pessoa.service';
import { PerfilResponse } from './../../../models/pessoa/perfilResponse.model';
import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pessoa/pais.model';
import { PerfilRequest } from 'src/app/models/pessoa/perfilRequest.model';
import { Usuario } from 'src/app/models/user/usuario.model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  perfil: PerfilResponse;
  perfilForm: FormGroup;
  userForm: FormGroup;
  usuario: Usuario;
  estados: Uf[];
  paises: Pais[];
  sucesso: boolean;
  mensagem: string;

  constructor(
    private pessoaService: PessoaService,
    private loginService: LoginService,
    private notification: NotificationService,
    private router: Router
  ) {
    const perfil = new PerfilRequest();
    this.validarFormulario(perfil);
    const usuario = new Usuario();
    this.validarFormUsuario(usuario);
  }

  ngOnInit(): void {
    this.paises = this.pessoaService.getPaises();
    this.estados = this.pessoaService.getEstados();
    this.dadosDoUsuarioLogado();
    this.carregarPerfil();
  }

  get nome (){
    return this.perfilForm.get('nome');
  }

  get email(){
    return this.perfilForm.get('email');
  }

  get telefone (){
    return this.perfilForm.get('telefone');
  }

  get cidade(){
    return this.perfilForm.get('cidade');
  }

  get uf(){
    return this.perfilForm.get('uf');
  }

  get pais(){
    return this.perfilForm.get('pais');
  }

  get imagem(){
    return this.perfilForm.get('imagem');
  }



  salvar(){
    const perfil = new PerfilRequest();
    perfil.nomeCompleto = this.nome?.value;
    perfil.email = this.email?.value;
    perfil.telefone = this.telefone?.value;
    perfil.cidade = this.cidade?.value;
    perfil.uf = this.uf?.value;
    perfil.pais = this.pais?.value;

    this.pessoaService.salvarPerfil(perfil).subscribe({
      next: (response) => {
        console.log(response);
        this.sucesso = response['sucesso'];
        this.mensagem = response['mensagem'];
        if(this.sucesso){
          this.notification.showSuccess(this.mensagem,'Perfil');
          this.router.navigate(['/users/account']);
        }
      },
      error: (response) => {
        console.error(response);
      }
    });
  }

  private dadosDoUsuarioLogado(){
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuario = user;
    }
  }

  private carregarPerfil(){
    this.pessoaService.meuPerfil().subscribe({
      next: (response) => {
        console.log(response);
        this.perfil = response;
        this.validarFormulario(this.perfil);
      }
    })
  }

  private validarFormulario(perfil: PerfilRequest){
    this.perfilForm = new FormGroup({
      nome: new FormControl(perfil.nomeCompleto, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150)
      ]),
      email: new FormControl(perfil.email, [
        Validators.required,
        Validators.email
      ]),
      telefone: new FormControl(perfil.telefone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14)
      ]),
      cidade: new FormControl(perfil.cidade, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      uf: new FormControl(perfil.uf, [ Validators.required ]),
      pais: new FormControl(perfil.pais, [ Validators.required ])
    });
  }

  private validarFormUsuario(usuario: Usuario){
    this.userForm = new FormGroup({
      user_id: new FormControl(usuario.id, [Validators.required]),
      user_nome: new FormControl(usuario.nome, [Validators.required]),
      user_email: new FormControl(usuario.email, [Validators.required, Validators.email])
    });
  }

}
