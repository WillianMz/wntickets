import { LoginService } from './../../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //const token = window.localStorage.getItem('token');
    if(this.loginService.usuarioEstaLogado()){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }

    /* const usuarioLogado = this.loginService.obterUsuarioLogado;
    let url = state.url;
    if(usuarioLogado) {
      if(route.data?.['role'] && route.data?.['role'].indexOf(usuarioLogado.perfil))
    } */
  }
  
}
