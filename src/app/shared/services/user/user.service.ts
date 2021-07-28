import { Injectable } from '@angular/core';
import {User} from "../../models/user/user.model";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
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

  getUserToken(): string {
    return this.authService.session().token;
  }

  getUserId(): string {
    return this.authService.session().user.id;
  }

  getUserUsername(): string {
    return this.authService.session().user.username;
  }

  getCurrentUser(): Observable<User>{
    const userSession = this.authService.session().user;
    return this.http.get<User>(`${this.url}/user/${userSession?.username}`)
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${ this.url }`);
  }

  // gainExperience(userId :string): Observable<any> {
  //   return this.http.put(`${ this.url }/increaseXp/${ this.getCurrentUser()?.id }`, {})
  // }
  //
  // increaseLevel(): Observable<any> {
  //   return this.http.put(`${ this.url }/increaseLevel/${ this.getCurrentUser()?.id }`, {})
  // }
  //
  // increaseSkillPoints(): Observable<any> {
  //   return this.http.put(`${ this.url }/increaseSp/${ this.getCurrentUser()?.id }`, {})
  // }
}
