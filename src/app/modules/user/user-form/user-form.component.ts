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
  boolTitulo: boolean = true;
  boolAviso: boolean = false;
  boolCod: boolean = true;
  boolNome: boolean = true;
  boolApelido: boolean = true;
  boolEmail: boolean = true;
  boolFone: boolean = true;
  boolSenha: boolean = true;
  boolSenhaConf: boolean = true;

  constructor(
    private usuarioService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {

    //PARA INICIAR O FORMULARIO
    const usuario = {nome: "", email: "", telefone: "", apelido: ""};

    this.start(usuario);
  }

  ngOnInit(): void {
    this.configurarForm();
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

  //CONFIGURA A APARENCIA DA PAGINA A SER EXIBIDA AO USUARIO
  private configurarForm(){
    //pega o id na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.tituloPagina = 'Editando usuário';
      this.userID = id;
      this.carregarDados(this.userID);
    }
    else{
      this.tituloPagina = 'Novo usuário';
      this.boolCod = false;
    }
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
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      ativa: [user.ativa],
      senha: [null],
      senhaConfirmacao: [null, [FormValidations.equalsTo('senha')]],
    });

    this.userForm.controls['senha'].valueChanges.forEach(() => {
      this.userForm.controls['senhaConfirmacao'].updateValueAndValidity();
    })
  }

  //CARREGA OBJETO E PREENCHE OS DADOS NA TELA
  private carregarDados(id: string){
     this.usuarioService.getById(id).subscribe({
      next: (response) => {
        this.usuario = response;
        
        if(this.usuario != null){
          this.start(this.usuario);
        }
        else{
          //MELHORAR AQUI
          this.showError('Não foi possível obter os dados do usuário');
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
    let usuario: NovoUsuarioModel;
    usuario = {
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      senha: user.senha,
      senhaConfirmacao: user.senhaConfirmacao
    }

    this.usuarioService.adicionar(usuario).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/users']);
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        console.log(response.error);
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
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
          this.router.navigate(['/users']);
          console.log('1');
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
          console.log('2');
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
