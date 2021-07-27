import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../authentication/authentication.service";
import {UserService} from "../user/user.service";
import {PurchaseRequestModel} from "../../models/weapons/purchaseRequest.model";
import {Observable} from "rxjs";
import {WeaponStoreModel} from "../../models/weapons/weaponStore.model";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private url = environment.endpoint + '/weapons'

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getWeaponsFromStore() {
    return this.http.get(`${ this.url }/store`);
  }

  getUserWeapon(): Observable<any> {
    return this.http.get(`${ this.url }/user/${ this.userService.getCurrentUser()?.id }`);
  }

  purchaseWeapon(purchaseRequest: PurchaseRequestModel) {
    return this.http.post(`${ this.url }/store/purchase`, purchaseRequest);
  }
}
