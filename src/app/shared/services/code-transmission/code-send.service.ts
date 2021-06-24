import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserCode} from "../../models/editor/user-code.model";
import {GodboxResponse} from "../../models/editor/godbox-response";

@Injectable({
  providedIn: 'root'
})
export class CodeSendService {

  private url = environment.endpoint + '/godbox';

  constructor(private http: HttpClient) { }

  sendCode(userCode: UserCode) {
    return this.http.post<GodboxResponse>(`${this.url}/run`, userCode).toPromise(); // à continuer
  }

  async mockSend(userCode: UserCode): Promise<any>{
    return new Promise((resolve, reject) => resolve({
      phases: [
        {
          name: "Compilation",
          status: 1,
          stdout: "",
          stderr: "",
          time: 0.037,
          time_wall: 0.043,
          used_memory: 6640,
          sandbox_status: null,
          csw_voluntary: 18,
          csw_forced: 16
        },
        {
          name: "Execution",
          status: 0,
          stdout: "Hello, World!\n",
          stderr: "",
          time: 0.002,
          time_wall: 0.007,
          used_memory: 856,
          sandbox_status: null,
          csw_voluntary: 7,
          csw_forced: 0
        }
      ]
    }));
  }
}
