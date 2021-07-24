import { Injectable } from '@angular/core';
import {User} from "../../models/user/user.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {Session} from "../../models/authentication/session.model";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.endpoint + '/users';

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  getCurrentUser(){
    const session = this.authService.session();
    return session?.user;
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${ this.url }`);
  }

  increaseXp(): Observable<any> {
    return this.http.put(`${ this.url }/increaseXp/${ this.getCurrentUser()?.id }`, {})
  }

  increaseLevel(): Observable<any> {
    return this.http.put(`${ this.url }/increaseLevel/${ this.getCurrentUser()?.id }`, {})
  }

  increaseSkillPoints(): Observable<any> {
    return this.http.put(`${ this.url }/increaseSp/${ this.getCurrentUser()?.id }`, {})
  }
}
