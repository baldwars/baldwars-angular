import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  async canActivate(): Promise<boolean | UrlTree> {
    return await this.authService.isLogged() || this.router.parseUrl('/login');
  }
}
