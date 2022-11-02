import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}
  
 /*  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //const token = window.localStorage.getItem('token');
    if(this.loginService.usuarioEstaLogado()){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  } */

  public canActivate(activated: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checarRota(activated);
  }

  public canActivatedChild(childRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checarRota(childRoute);
  }

  protected checarRota(activated: ActivatedRouteSnapshot): Observable<boolean> {
    if(typeof activated.data['roles'] !== 'undefined' && activated.data['roles'].length){
      const rolesRota = activated.data['roles'];
      const usuarioLogado = this.loginService.usuarioLogado();
      const role = usuarioLogado?.perfil;

      return new Observable<boolean>(subscriber => {
        if(!VerificarPermissoes.temPermissao(rolesRota, role!)){
          subscriber.next(false);
          this.router.navigate(['/acesso-negado']);
        }
        else{
          subscriber.next(true);
        }
      });
    }

    return new Observable<boolean>(subscriber => subscriber.next(true));
  }
  
}
