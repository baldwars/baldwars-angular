import { Component, OnInit } from '@angular/core';
import {CodeSendService} from "../../shared/services/code-transmission/code-send.service";
import {UserCode} from "../../shared/models/editor/user-code.model";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'c'};
  userCode: UserCode = {
    username: this.userService.getCurrentUser()?.username,
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
    private codeSendService: CodeSendService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onInit(editor: any) {
    let line = editor.getPosition();
  }

  async sendCode() {
    // const response = await this.codeSendService.sendCode(this.userCode);
    const response = await this.codeSendService.mockSend(this.userCode);
    if (response.phases[0].status !== 0) {
      console.log('compil error occurred')
      this.serverResponse = "Compilation error : " + response.phases[0].stderr;
      return;
    }
    if (response.phases[1].status !== 0) {
      console.log('execute error occurred')
      this.serverResponse = "Execution error : " + response.phases[1].stderr;
      return;
    }
    console.log("response :", response);
    this.serverResponse = response.phases[1].stdout;
  }
}
