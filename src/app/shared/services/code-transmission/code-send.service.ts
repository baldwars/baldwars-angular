import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserCode} from "../../models/editor/user-code.model";

@Injectable({
  providedIn: 'root'
})
export class CodeSendService {

  private url = environment.endpoint + '/godbox';

  constructor(private http: HttpClient) { }

  sendCode(code: UserCode) {
    return this.http.post(`${this.url}/run`, code, {observe: 'response'});
  }
}
