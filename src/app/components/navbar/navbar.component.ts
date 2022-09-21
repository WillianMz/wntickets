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
  public modulos = [
    { titulo: 'Home', url: '/home', icone: 'bi bi-house' },
    { titulo: 'Laboratórios', url: '/laboratorios', icone: 'bi bi-binoculars-fill' },
    { titulo: 'Equipamentos', url: '/equipamentos', icone: 'bi bi-pc-display' },
    { titulo: 'Chamados', url: '/chamados', icone: 'bi bi-ticket-detailed-fill' }
  ];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.titlePage = "SUPORTE TI";
    this.configurarNavBar();
  }

  configurarNavBar(){
    this.usuario = this.loginService.usuarioLogado();
  }

  sair(){
    this.loginService.fazerLogout();
  }
}
