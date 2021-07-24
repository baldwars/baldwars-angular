import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {Warrior} from "../../models/warrior/warrior.model";

@Injectable({
  providedIn: 'root'
})
export class WarriorService {

  private url = environment.endpoint + '/warriors';

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  getOwner(id: number) {
    return this.http.get<any[]>(`${ this.url }/${ id }`);
  }

  getAllWarriors() {
    return this.http.get<Warrior[]>(`${ this.url }`);
  }

  updateWarrior(warrior: Warrior) {
    return this.http.put<Warrior>(`${ this.url }/update`, warrior);
  }
}
