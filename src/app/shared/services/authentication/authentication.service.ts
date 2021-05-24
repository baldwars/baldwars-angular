import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { LoginResponse } from "../../models/authentication/login-response.model";
import { environment } from "../../../../environments/environment";
import { Session } from "../../models/authentication/session.model";
import { User } from "../../models/user/user.model";
import { NewAccount } from "../../models/user/new-account.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.endpoint + '/auth';

  constructor(private http: HttpClient) { }

  async isLogged(){
    const session = this.session();

    if (!session?.token) return false;

    try {
      await this.http.get<HttpResponse<any>>(`${ this.url }/check`).toPromise();
      return true;
    } catch {
      return false;
    }
  }

  async isNotLogged() {
    const logged = await this.isLogged();
    return !logged;
  }

  async login(username: string, password: string) {
    try {
      const res = await this.http
        .post<LoginResponse>(`${this.url}/login`, { username, password })
        .toPromise();

      if (!res?.token) return false;

      AuthenticationService.setSessionToLocalStorage(res.token, undefined);
      const user = await this.http.get<User>(`${ environment.endpoint }/users/user/${ username }`).toPromise();

      if (!user || !user?.id || !user?.username || !user?.eloScore ) return false;

      AuthenticationService.setSessionToLocalStorage(res.token, user);

      return true;

    } catch {
      return false;
    }
  }

  logout() {
    localStorage.clear()
  }

  private static setSessionToLocalStorage(token: string, user: User | undefined): void {
    const session = JSON.stringify({
      token,
      user,
    });
    localStorage.setItem('session', btoa(session));
  }

  session(): Session {
    const session = localStorage.getItem('session')
    return !session ? null : JSON.parse(atob(session));
  }

  register(account: NewAccount): Observable<any> {
    return this.http.post(`${this.url}/register`, account, {observe: 'response'});
  }
}
