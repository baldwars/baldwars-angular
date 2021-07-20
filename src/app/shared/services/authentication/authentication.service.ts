import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
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
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

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
      const response = await this.http.get<any>(`${ environment.endpoint }/users/user/${ username }`).toPromise();

      if (!response) return false;

      const user: User = {
        id: response?.id,
        username: response?.username,
        firstName: response?.firstName,
        lastName: response?.lastName,
        eloPoints: response?.eloPoints
      }

      AuthenticationService.setSessionToLocalStorage(res.token, user);
      this.fireIsLoggedIn.emit();

      return true;

    } catch {
      return false;
    }
  }

  getEmitter() {
    return this.fireIsLoggedIn;
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
