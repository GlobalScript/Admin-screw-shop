import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/authServices/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {

constructor(private tokenService: TokenService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = this.tokenService.parseJwt().role;
      if(role === "moderator" || role === "admin") return true;
          else {
              this.router.navigate(['admin/chart']);
              return false;
        } 
    }
  
}
