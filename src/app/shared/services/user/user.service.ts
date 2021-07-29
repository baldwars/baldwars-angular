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

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ this.url }`);
  }

  getOpponents(userId: string) {
    return this.http.get<User[]>(`${ this.url }/user/${ userId }/opponents`);
  }
}
