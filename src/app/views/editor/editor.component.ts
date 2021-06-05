import { Component, OnInit } from '@angular/core';
import {CodeSendService} from "../../shared/services/code-transmission/code-send.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'c'};
  code: string= `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`;

  constructor(
    private codeSendService: CodeSendService
  ) { }

  ngOnInit(): void {
  }

  onInit(editor: any) {
    let line = editor.getPosition();
    console.log(line);
  }

  sendCode() {
    this.codeSendService.sendCode(this.code);
    console.log(this.code);
  }
}
