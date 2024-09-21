import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';
import { PerfilResponse } from './../../models/pessoa/perfilResponse.model';
import { Usuario } from './../../models/user/usuario.model';
import { LoginService } from './../../services/login.service';
import { PessoaService } from './../../services/pessoa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() titlePage: string;
  @Input() menus: boolean = true;

  usuario: Usuario;
  perfil: PerfilResponse;
  public modulos: any[];

  constructor(
    private loginService: LoginService,
    private pessoaService: PessoaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titlePage = "wn suporte";
    this.configurarNavBar();
    this.exibirMenus();
  }

  configurarNavBar(){
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuario = user;
    }
    this.carregarPerfil();
  }

  sair(){
    this.loginService.fazerLogout();
  }

  public minhaConta() {
    this.router.navigate(['/users/minha-conta']);
  }

  public verificarPermissao(roleFuncionalidade: string[]): boolean{
    const usuarioLogado = this.loginService.usuarioLogado();
    const role = usuarioLogado?.perfil;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
  }

  private exibirMenus(){
    this.modulos = [
      { titulo: 'Home', url: '/home', icone: 'bi bi-house', visivel: this.verificarPermissao(['Usuario','Suporte','Gerente','Admin'])},
      { titulo: 'Setores', url: '/labs', icone: 'bi bi-binoculars-fill', visivel: this.verificarPermissao(['Usuario','Suporte','Gerente','Admin']) },
      { titulo: 'Equipamentos', url: '/equipment', icone: 'bi bi-pc-display', visivel: this.verificarPermissao(['Suporte','Gerente','Admin']) },
      { titulo: 'Chamados', url: '/ticket', icone: 'bi bi-ticket-detailed-fill', visivel: this.verificarPermissao(['Suporte','Gerente','Admin']) },
      { titulo: 'Usuários', url: '/users', icone: 'bi bi-people', visivel: this.verificarPermissao(['Admin']) }
    ];
  }

  private carregarPerfil(){
    this.pessoaService.meuPerfil().subscribe({
      next: (response) => {
        if(response){
          this.perfil = response;
        }
        else{
          this.router.navigate(['/users/account']);
        }
      }
    });
  }
}
