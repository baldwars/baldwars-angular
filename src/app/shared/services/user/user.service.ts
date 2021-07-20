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

/*  async getAllUsers() {
    try {
      const res = await this.http.get(`${ this.url }`).toPromise();
      return res;
    } catch {
      return false;
    }
  }*/

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${ this.url }`);
  }

  getUserWarrior(id: number): Observable<any> {
    return this.http.get<any[]>(`${ this.url }/${ id }`);
  }
}
