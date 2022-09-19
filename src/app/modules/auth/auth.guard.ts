import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //const token = window.localStorage.getItem('token');
    if(this.userService.usuarioEstaLogado()){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
