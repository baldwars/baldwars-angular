import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fight} from "../../models/fight/fight";

@Injectable({
  providedIn: 'root'
})
export class FightService {

  private url = environment.endpoint + '/fights';

  constructor(private http: HttpClient) { }

  getUserFightsHistory(userId: string): Observable<Fight> {
    return this.http.get<Fight>(`${ this.url }/user/${ userId }`);
  }
}
