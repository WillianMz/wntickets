import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErroServidor } from 'src/app/models/erroServidor';
import { UserService } from 'src/app/services/user.service';
import { CadastroUsuarioRequest } from 'src/app/models/user/cadastroUsuarioRequest.model';
import { UsuarioModel } from 'src/app/models/user/usuarioModel';
import { NovoUsuarioModel } from 'src/app/models/user/novoUsuarioModel';
import { EditarUsuarioModel } from 'src/app/models/user/editarUsuarioModel';
import { NgxMaskModule } from 'ngx-mask';
import { FormValidations } from 'src/app/functions/form-validations';
import { CadastroUsuarioResponse } from 'src/app/models/user/cadastroUsuarioResponse.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() userID: string;
  @Input() navbarVisible: boolean;
  @Input() titleFormVisible: boolean;

  tituloPagina: string = 'Detalhes do Usuário';
  userForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  usuario: UsuarioModel;
  //campos visiveis
  //campos visiveis
  boolAtiva: boolean = true;
  boolTitulo: boolean = true;
  boolAviso: boolean = false;
  boolCod: boolean = false;
  boolNome: boolean = true;
  boolApelido: boolean = true;
  boolEmail: boolean = true;
  boolFone: boolean = true;
  boolSenha: boolean = true;
  boolSenhaConf: boolean = true;
  boolVoltaList: boolean = true;

  cadastroUsuarioResponse: CadastroUsuarioResponse;

  constructor(
    private usuarioService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {

    //PARA INICIAR O FORMULARIO
    const usuario = {nome: "", email: "", telefone: "", apelido: ""};

    this.start(usuario);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'),
          origem = this.activatedRoute.snapshot.paramMap.get('origem');
    if (id) {
      this.userID = id;
      this.tituloPagina = 'Detalhes do Usuário';
      this.carregarDados(this.userID);
    } else {
      this.tituloPagina = 'Novo Usuário';
      this.boolCod = false;
      this.boolApelido = false;
      this.boolAtiva = false;
    }

    this.boolVoltaList = origem == 'list' || id ? true : false;

  }

  //GETS
  get nome() {
    return this.userForm.get('nome');
  }

  get email() {
    return this.userForm.get('email');
  }

  get telefone() {
    return this.userForm.get('telefone');
  }

  get apelido() {
    return this.userForm.get('apelido');
  }

  get ativa() {
    return this.userForm.get('ativa');
  }

  get senha() {
    return this.userForm.get('senha') as FormGroup || null;
  }

  get senhaConfirmacao() {
    return this.userForm.get('senhaConfirmacao') as FormGroup;
  }

  //VERIFICAR OS TAMANHOS DOS CAMPOS -> VER NO BANCO DE DADOS
  private start(user: UsuarioModel){
    this.userForm = this.formBuilder.group({
      contaUsuarioId: [user.contaUsuarioId],
      nome: [user.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      email: [user.email, [
        Validators.required,
        Validators.email
      ]],
      telefone: [user.telefone, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(17)
      ]],
      apelido: [user.apelido, [
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      ativa: [user.ativa],
      senha: [null, [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,50}')]],
      senhaConfirmacao: [null, [FormValidations.equalsTo('senha')]],
    });
    
    this.userForm.controls['senha'].valueChanges.forEach(() => {
      this.userForm.controls['senhaConfirmacao'].updateValueAndValidity();
    })

  }

  private setUserApelidoValidators() {
    const apelidoControl = this.userForm.get('apelido');

    if (!apelidoControl) {
      return;
    }

    if (this.boolApelido) {
      apelidoControl.setValidators([Validators.required]);
    } else {
      apelidoControl.setValidators(null);
    }

    apelidoControl.updateValueAndValidity();
  }

  //CARREGA OBJETO E PREENCHE OS DADOS NA TELA
  private carregarDados(id: string){
    console.log(id);
     this.usuarioService.getById(id).subscribe({
      next: (response) => {
       // this.usuario = response;        
        if(this.usuario != null){
          this.start(this.usuario);
          this.setUserApelidoValidators();
        }
        else{
          this.notificationService.showWarning(this.message);
        }
      }
    });
  }

  salvar(){
    if(this.userID){
      let user: UsuarioModel;
      user = {
        //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
        contaUsuarioId: this.userID,
        nome:this.nome?.value,
        email: this.email?.value,
        telefone: this.telefone?.value,
        apelido: this.apelido?.value,
        ativa: this.ativa?.value
      };
      
      this.editarUsuario(user);
    }
    else {
      //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
      let user: UsuarioModel;
      user = {
        //CRIA UM NOVO OBJETO COM OS CAMPOS NECESSARIOS PARA MANDAR PARA O BACKEND
        contaUsuarioId: this.userID,
        nome:this.nome?.value,
        email: this.email?.value,
        telefone: this.telefone?.value,
        apelido: this.apelido?.value,
        ativa: this.ativa?.value,
        senha: this.senha.value,
        senhaConfirmacao: this.senhaConfirmacao.value
      };
      //SALVAR
      this.novoUsuario(user);
    };
  }

  private novoUsuario(user: UsuarioModel){
    let usuario: CadastroUsuarioRequest;
    usuario = {
      nome: user.nome,
      email: user.email,
      senha: user.senha == null ? "" : user.senha,
      senhaConfirmacao: user.senhaConfirmacao == null ? "" : user.senhaConfirmacao
    }

    this.usuarioService.adicionar(usuario).subscribe({
      next: (response) => {
        if (response) {
          if (response?.sucesso == true) {
            this.success = response['sucesso'];
            this.message = response['mensagem'];
            this.cadastroUsuarioResponse = response;
            this.notificationService.showSuccess(this.message);
            if (this.boolVoltaList) {
              this.router.navigate(['/users/list']);
            } else {
              this.router.navigate(['/users']);
            }
            
          } else {
            this.cadastroUsuarioResponse.erros = response.erros;
            this.notificationService.showWarning(this.message);
          }
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notificationService.showError('Erro ao salvar usuário: ' + this.message);
      }
    });
  }

  private editarUsuario(user: UsuarioModel){
    let usuario: EditarUsuarioModel;
    usuario = {
      contaUsuarioId: user.contaUsuarioId ? user.contaUsuarioId : "",
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      apelido: user.apelido,
      ativa: user.ativa
    }

    this.usuarioService.editar(usuario).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          if (this.boolVoltaList) {
            this.router.navigate(['/users/list']);
          } else {
            this.router.navigate(['/users']);
          }
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
