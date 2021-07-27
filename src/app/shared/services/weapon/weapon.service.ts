import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PurchaseRequestModel} from "../../models/weapons/purchaseRequest.model";
import {Observable} from "rxjs";
import {WeaponStore} from "../../models/weapons/weaponStore.model";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private url = environment.endpoint + '/weapons'

  constructor(private http: HttpClient) { }

  getWeaponsFromStore(): Observable<WeaponStore[]> {
    return this.http.get<WeaponStore[]>(`${ this.url }/store`);
  }

  getUserWeapons(userId: string): Observable<WeaponStore[]> {
    return this.http.get<WeaponStore[]>(`${ this.url }/user/${ userId }`);
  }

  purchaseWeapon(purchaseRequest: PurchaseRequestModel) {
    return this.http.post(`${ this.url }/store/purchase`, purchaseRequest);
  }
}
