import { Component, OnInit } from '@angular/core';
import {CodeSendService} from "../../shared/services/code-transmission/code-send.service";
import {UserCode} from "../../shared/models/editor/user-code.model";
import {UserService} from "../../shared/services/user/user.service";
import {NotifierService} from "angular-notifier";
import {ScriptService} from "../../shared/services/scripts/script.service";
import {Script} from "../../shared/models/script.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'c'};
  userCode: UserCode = {
    username: this.userService.getUserUsername(),
    code: `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`
  };
  serverResponse = "";

  scripts: Script[] = [];
  currentScript?: Script;

  constructor(
    private route: ActivatedRoute,
    private codeSendService: CodeSendService,
    private userService: UserService,
    private scriptService: ScriptService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.scriptService.getUserScripts(this.userService.getUserId())
      .subscribe((response: Script[]) => {
        this.scripts = response;
        this.route.queryParams.subscribe(params => {
          if (params.script) {
            this.currentScript = this.scripts.find(script => script.id === params.script);
          } else {
            this.currentScript = this.scriptService.getScriptStarter(this.userService.getUserId());
          }
        });
      });
  }

  // onInit(editor: any) {
  //   let line = editor.getPosition();
  // }

  testScript() {

  }

  // async sendCode() {
  //   // const response = await this.codeSendService.sendCode(this.userCode);
  //   const response = await this.codeSendService.mockSend(this.userCode);
  //   if (response.phases[0].status !== 0) {
  //     console.log('compil error occurred')
  //     this.notifierService.notify('error', 'Compilation error')
  //     this.serverResponse = "Compilation error : " + response.phases[0].stderr;
  //     return;
  //   }
  //   if (response.phases[1].status !== 0) {
  //     console.log('execute error occurred')
  //     this.notifierService.notify('error', 'Execution error')
  //     this.serverResponse = "Execution error : " + response.phases[1].stderr;
  //     return;
  //   }
  //   console.log("response :", response);
  //   this.serverResponse = response.phases[1].stdout;
  // }
}
