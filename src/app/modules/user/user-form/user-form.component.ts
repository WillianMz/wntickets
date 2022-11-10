import { LoginService } from 'src/app/services/login.service';
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
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    let newUser = new CadastroUsuarioRequest;
    newUser.email = '';
    newUser.nome = '';
    newUser.senha = '';
    newUser.senhaConfirmacao = '';

    this.startForm(newUser);
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
  get email() {
    return this.userForm.get('email');
  }

  get nome() {
    return this.userForm.get('nome');
  }

  get senha() {
    return this.userForm.get('senha');
  }

  get confirmarSenha() {
    return this.userForm.get('confirmarSenha');
  }

  public salvar(){
    let usuario = new CadastroUsuarioRequest();
    usuario.email = this.email?.value;
    usuario.nome = this.nome?.value;
    usuario.senha = this.senha?.value;
    usuario.senhaConfirmacao = this.confirmarSenha?.value;

    this.loginService.criarContaDeUsuario(usuario).subscribe({
      next: (response) => {
        if(response){
          this.cadastroUsuarioResponse = response;
          if(this.cadastroUsuarioResponse.sucesso == true){
            this.notificationService.showSuccess('Conta de usuário criada com sucesso!','Novo Usuário');
            this.router.navigate(['/users']);
          }
          else if(response.sucesso == false){
            console.log(response.erros);
            this.cadastroUsuarioResponse.erros = response.erros;
            this.notificationService.showError('Erro ao criar conta de usuário. Tente novamente!','Novo usuário');
          }
        }
      },
      error: () => { }
    })
  }

  private startForm(usuario: CadastroUsuarioRequest){
    this.userForm = this.formBuilder.group({
      email: [usuario.email, [
        Validators.required,
        Validators.email
      ]],
      nome: [usuario.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      senha: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,50}')]],
      confirmarSenha: [null, [FormValidations.equalsTo('senha')]]
    });
    
    this.userForm.controls['senha'].valueChanges.forEach(() => {
      this.userForm.controls['confirmarSenha'].updateValueAndValidity();
    });
  }

  //CARREGA OBJETO E PREENCHE OS DADOS NA TELA
  private carregarDados(id: string){
    console.log(id);
     this.usuarioService.getById(id).subscribe({
      next: (response) => {
       // this.usuario = response;        
        /* if(this.usuario != null){
          this.startForm(this.usuario);
        }
        else{
          this.notificationService.showWarning(this.message);
        } */
      }
    });
  }

}
