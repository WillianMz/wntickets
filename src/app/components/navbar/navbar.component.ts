import { PerfilResponse } from './../../models/pessoa/perfilResponse.model';
import { PessoaService } from './../../services/pessoa.service';
import { Usuario } from './../../models/user/usuario.model';
import { LoginService } from './../../services/login.service';
import { Component, Input, OnInit } from '@angular/core';

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
  public modulos = [
    { titulo: 'Home', url: '/home', icone: 'bi bi-house' },
    { titulo: 'Laboratórios', url: '/labs', icone: 'bi bi-binoculars-fill' },
    { titulo: 'Equipamentos', url: '/equipment', icone: 'bi bi-pc-display' },
    { titulo: 'Chamados', url: '/ticket', icone: 'bi bi-ticket-detailed-fill' },
    { titulo: 'Usuários', url: '/users', icone: 'bi bi-people' }
  ];

  constructor(
    private loginService: LoginService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.titlePage = "SUPORTE TI";
    this.configurarNavBar();
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

  private carregarPerfil(){
    this.pessoaService.meuPerfil().subscribe({
      next: (response) => {
        this.perfil = response;
      }
    });
  }
}
