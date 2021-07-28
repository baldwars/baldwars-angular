import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {WeaponGameModel} from "../../../shared/models/weapons/weaponGame.model";

@Component({
  selector: 'app-weapon-details-dialog',
  templateUrl: './weapon-details-dialog.component.html',
  styleUrls: ['./weapon-details-dialog.component.scss']
})
export class WeaponDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: WeaponGameModel) { }

  ngOnInit(): void {
  }

}
