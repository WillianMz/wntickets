import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.css']
})
export class DashUserComponent implements OnInit {

  usuario: Usuario;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuario = user;
    }
  }

}
