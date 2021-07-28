import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Script} from "../../models/script.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private url = environment.endpoint + "/scripts";
  private default = `#include <stdio.h>
int main() {
   printf("Hello, World!");
   return 0;
}`

  constructor(private http: HttpClient) { }

  getUserScripts(userId: string): Observable<Script[]> {
    return this.http.get<Script[]>(`${ this.url }/${ userId }`);
  }

  getScriptStarter(ownerId: string): Script {
    return {
      id: '',
      owner: ownerId,
      name: 'no name',
      content: this.default,
      isDefense: false
    };
  }
}
