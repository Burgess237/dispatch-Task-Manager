import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public firebaseAuth: FirebaseAuthentication, public router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
      if(this.authService.isLoggedIn) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
}
