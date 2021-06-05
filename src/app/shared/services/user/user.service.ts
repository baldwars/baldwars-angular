import { Injectable } from '@angular/core';
import {User} from "../../models/user/user.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {Session} from "../../models/authentication/session.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser?: User;
  isLogged: boolean = false;

  constructor(
    private authService: AuthenticationService
  ) {
    this.authService.isLogged().then(logged => {
      this.isLogged = logged;
      if (this.isLogged) {
        this.currentUser = this.authService.session()?.user;
      }
    });
  }

  getUsername(){
    const session = this.session();
    return session?.user;
  }

  session(): Session {
    const session = localStorage.getItem('session')
    return !session ? null : JSON.parse(atob(session));
  }
}
