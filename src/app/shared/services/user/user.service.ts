import { Injectable } from '@angular/core';
import {User} from "../../models/user/user.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {Session} from "../../models/authentication/session.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthenticationService
  ) { }

  getCurrentUser(){
    const session = this.authService.session();
    return session?.user;
  }
}
