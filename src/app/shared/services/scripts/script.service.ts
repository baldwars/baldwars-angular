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

  constructor(private http: HttpClient) { }

  getUserScripts(userId: string): Observable<Script[]> {
    return this.http.get<Script[]>(`${ this.url }/${ userId }`);
  }
}
