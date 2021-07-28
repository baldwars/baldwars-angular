import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Script} from "../../../shared/models/scripts/script.model";

@Component({
  selector: 'app-script-name-dialog',
  templateUrl: './script-name-dialog.component.html',
  styleUrls: ['./script-name-dialog.component.scss']
})
export class ScriptNameDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ScriptNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Script) { }

  ngOnInit(): void {
    if (this.data.id === '') {
      this.data.name = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
