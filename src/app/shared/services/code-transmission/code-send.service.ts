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

  sendCode(userCode: UserCode) {
    return this.http.post(`${this.url}/run`, userCode).toPromise(); // à continuer
  }

  async mockSend(): Promise<any>{
    return new Promise((resolve, reject) => resolve({
      phases: [
        {
          name: "Compilation",
          status: 0,
          stdout: "",
          stderr: "OK (0.041 sec real, 0.048 sec wall)\n"
        },
        {
          name: "Execution",
          status: 0,
          stdout: "Hello, World!\n",
          stderr: "OK (0.001 sec real, 0.005 sec wall)\n"
        }
      ]
    }));
  }
}
