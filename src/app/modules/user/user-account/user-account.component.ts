import { UserService } from 'src/app/services/user.service';
import { AlterarSenhaRequest } from './../../../models/user/alterarSenhaRequest';
import { UploadService } from './../../../services/upload.service';
import { NotificationService } from './../../../services/notification.service';
import { LoginService } from './../../../services/login.service';
import { Uf } from './../../../models/pessoa/uf.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PessoaService } from './../../../services/pessoa.service';
import { PerfilResponse } from './../../../models/pessoa/perfilResponse.model';
import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pessoa/pais.model';
import { PerfilRequest } from 'src/app/models/pessoa/perfilRequest.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { ConfirmationService } from 'primeng/api';

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
  imagemForm: any;
  imagemNome: string;
  urlFotoPerfil: string;
  fotoPerfil: string;

  constructor(
    private pessoaService: PessoaService,
    private loginService: LoginService,
    private uploadService: UploadService,
    private notification: NotificationService,
    private usuarioService: UserService,
    private confirmationService: ConfirmationService
  ) {
    this.dadosDoUsuarioLogado();
    this.carregarPerfil();
    const perfil = new PerfilRequest();
    this.validarFormulario(perfil);
    const alterarSenha = new AlterarSenhaRequest()
    this.validarFormUsuario(alterarSenha);
  }

  ngOnInit(): void {
    this.paises = this.pessoaService.getPaises();
    this.estados = this.pessoaService.getEstados();
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

  get senhaAtual() {
    return this.userForm.get('senhaAtual');
  }

  get novaSenha(){
    return this.userForm.get('novaSenha');
  }

  get confirmaSenha() {
    return this.userForm.get('confirmaNovaSenha');
  }

  upload(file: any) {
    // necessario para upload via IformFile
    this.imagemForm = file[0];
    this.imagemNome = file[0].name;
    this.atualizarFoto();
    // necessario para upload via base64
    /* var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]); */
  }

  atualizarFoto(){
    let formdata = new FormData();
    formdata.append('file', this.imagemForm, this.imagemNome);

    this.uploadService.file(formdata).subscribe({
      next: (response) => {
        /* console.log(response);
        alert(response['objeto']); */
        if(response){
          this.urlFotoPerfil = response['objeto'];
          this.perfil.imgPerfil = this.urlFotoPerfil;
        }
      },
      error: (response) => {
        console.log(response);
      }
    });    
  }

  alterarSenha(){
    const alterarSenha = new AlterarSenhaRequest();
    alterarSenha.email = this.perfil?.email;
    alterarSenha.senhaAtual = this.senhaAtual?.value;
    alterarSenha.novaSenha = this.novaSenha?.value;

    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a alteração de senha?',
      accept: () => {
        this.usuarioService.alterarSenha(alterarSenha).subscribe({
          next: (response) => {
            console.log(response);
            this.notification.showSuccess(response['mensagem'], 'Alteração de Senha');
            this.loginService.fazerLogout();
          },
          error: (response) => {
            console.log(response);
          }
        });
      }
    });
  }

  salvar(){
    const perfil = new PerfilRequest();
    perfil.nomeCompleto = this.nome?.value;
    perfil.email = this.email?.value;
    perfil.telefone = this.telefone?.value;
    perfil.cidade = this.cidade?.value;
    perfil.uf = this.uf?.value;
    perfil.pais = this.pais?.value;
    perfil.imgPerfil = this.urlFotoPerfil;

    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Salvar as alterações efetuadas em seu perfil?',
      accept: () => {
        this.pessoaService.salvarPerfil(perfil).subscribe({
          next: (response) => {
            console.log(response);
            this.sucesso = response['sucesso'];
            this.mensagem = response['mensagem'];
            if(this.sucesso){
              this.notification.showSuccess(this.mensagem,'Perfil');
              location.reload();
              //this.router.navigate(['/users/account']);
            }
          },
          error: (response) => {
            console.error(response);
          }
        });
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
        this.perfil = response;
        this.validarFormulario(this.perfil);
      }
    });
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
      pais: new FormControl(perfil.pais, [ Validators.required ]),
      imagem: new FormControl(perfil.imgPerfil)
    });
  }

  private validarFormUsuario(conta: AlterarSenhaRequest){
    this.userForm = new FormGroup({
      senhaAtual: new FormControl(conta.senhaAtual, [Validators.required]),
      novaSenha: new FormControl(conta.novaSenha, [Validators.required]),
      confirmaNovaSenha: new FormControl()
    });
  }

}
