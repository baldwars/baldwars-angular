import { Component, OnInit } from '@angular/core';
import {CodeSendService} from "../../shared/services/code-transmission/code-send.service";
import {UserCode} from "../../shared/models/editor/user-code.model";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'c'};
  userCode: UserCode = {
    username: "Mukerz",
    code: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`
  };
  serverResponse = "";
  /*code: string= `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`;*/

  constructor(
    private codeSendService: CodeSendService
  ) { }

  ngOnInit(): void {
  }

  onInit(editor: any) {
    let line = editor.getPosition();
    console.log(line);
  }

  async sendCode() {
    const response = await this.codeSendService.sendCode(this.userCode);
    if (response.phases[0].status !== 0) {
      console.log(response.phases[0].stderr)
    }
    // const response = await this.codeSendService.mockSend();
    console.log(response);
    console.log(response.phases[1].stdout);
    this.serverResponse = response.phases[1].stdout;
  }
}
