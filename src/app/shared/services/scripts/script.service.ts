import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Script} from "../../models/scripts/script.model";
import {environment} from "../../../../environments/environment";
import {ScriptRequest} from "../../models/scripts/script-request.model";

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
      name: '',
      content: this.default,
      isDefense: false
    };
  }

  save(script: Script): Observable<HttpResponse<void>> {
    if (script.name === '') {
      const request : ScriptRequest = {
        content: script.content,
        isDefense: script.isDefense,
        name: script.name,
        owner: script.owner
      }
      return this.http.post<void>(`${ this.url }`, request, { observe: 'response' });
    }

    console.log('script')
    console.log(script)
    return this.http.put<void>(`${ this.url }/${ script.id }`, script, { observe: 'response' });
  }
}
