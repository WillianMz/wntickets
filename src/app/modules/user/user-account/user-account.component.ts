import { PessoaResponse } from './../../../models/pessoa/pessoaResponse.model';
import { RoleResponse } from './../../../models/user/roleResponse.model';
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
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  tituloPagina: string;
  perfil: PessoaResponse;
  //pessoa: PessoaResponse;
  perfilForm: FormGroup;
  alterarSenhaForm: FormGroup;
  usuarioForm: FormGroup;
  usuario: Usuario;
  estados: Uf[];
  paises: Pais[];
  sucesso: boolean;
  mensagem: string;
  imagemForm: any;
  imagemNome: string;
  urlFotoPerfil: string;
  fotoPerfil: string;
  pessoaId: string;
  contaId: number;
  roles: RoleResponse[];

  constructor(
    private pessoaService: PessoaService,
    private loginService: LoginService,
    private uploadService: UploadService,
    private notification: NotificationService,
    private usuarioService: UserService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const perfil = new PessoaResponse();
    this.validarFormulario(perfil);
    const alterarSenha = new AlterarSenhaRequest()
    this.validarFormSenha(alterarSenha);
    const usuario = new Usuario();
    this.validarFormUsuario(usuario);
  }

  ngOnInit(): void {
    this.paises = this.pessoaService.getPaises();
    this.estados = this.pessoaService.getEstados();
    this.listarRoles();

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.pessoaId = params.pessoaId;
      }
    );
    
    if(this.pessoaId){
      this.tituloPagina = 'Detalhes do Usuário';
      console.log('aqui 1');
      this.carregarDadosDaPessoa(this.pessoaId);
      this.carregarDadosDoUsuario(this.pessoaId);
    }
    else{
      this.tituloPagina = 'Meu Perfil';
      this.dadosDoUsuarioLogado();
      this.carregarPerfil();
    }    
  }

  public verificarPermissao(roleFuncionalidade: string[]): boolean{
    const usuarioLogado = this.loginService.usuarioLogado();
    const role = usuarioLogado?.perfil;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
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
    return this.alterarSenhaForm.get('senhaAtual');
  }

  get novaSenha(){
    return this.alterarSenhaForm.get('novaSenha');
  }

  get confirmaSenha() {
    return this.alterarSenhaForm.get('confirmaNovaSenha');
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

    this.uploadService.imagem(formdata).subscribe({
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
    alterarSenha.email = this.perfil?.email!;
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
        if(response){
          this.perfil = response;
          this.urlFotoPerfil = this.perfil.imgPerfil!;
          this.validarFormulario(this.perfil);
        }
      }
    });
  }

  private carregarDadosDaPessoa(id: string){
    this.pessoaService.getById(id).subscribe({
      next: (response) => {
        if(response){
          this.perfil = response;
          this.urlFotoPerfil = this.perfil.imgPerfil!;
          this.validarFormulario(this.perfil);
        }
        else{
          alert('Pessoa não possuí perfil cadastrado!');
          this.router.navigate(['/users']);
        }
      }
    })
  }

  private carregarDadosDoUsuario(id: string){
    this.usuarioService.getById(id).subscribe({
     next: (response) => {
      console.log(response);
       this.usuario = response;
       if(this.usuario != null){
         this.validarFormUsuario(this.usuario);
       }
       else{
         //MELHORAR AQUI
         //this.showError('Não foi possível obter os dados do usuário');
       }
     }
   });
 }


  private listarRoles(){
    this.usuarioService.getRoles().subscribe({
      next: (response) =>{
        if(response){
          this.roles = response;
        }
      }
    })
  }

  private validarFormulario(pessoa: PessoaResponse){
    this.perfilForm = new FormGroup({
      nome: new FormControl(pessoa.nomeCompleto, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      telefone: new FormControl(pessoa.telefone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14)
      ]),
      cidade: new FormControl(pessoa.cidade, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      uf: new FormControl(pessoa.uf, [ Validators.required ]),
      pais: new FormControl(pessoa.pais, [ Validators.required ]),
      imagem: new FormControl(pessoa.imgPerfil)
    });
  }

  private validarFormSenha(conta: AlterarSenhaRequest){
    this.alterarSenhaForm = new FormGroup({
      senhaAtual: new FormControl(conta.senhaAtual, [Validators.required]),
      novaSenha: new FormControl(conta.novaSenha, [Validators.required]),
      confirmaNovaSenha: new FormControl()
    });
  }

  private validarFormUsuario(usuario: Usuario){
    this.usuarioForm = new FormGroup({
      id: new FormControl(usuario.id),
      nome: new FormControl(usuario.nome),
      email: new FormControl(usuario.email),
      tipo: new FormControl(usuario.perfil),
      perfil: new FormControl(usuario.roles),
      ativo: new FormControl(),
      bloqueado: new FormControl(usuario.bloqueado),
      emailConf: new FormControl(usuario.emailConfirmado)
    });

    console.log(this.usuarioForm.value);
  }

}
