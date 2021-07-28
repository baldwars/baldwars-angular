import { Component, OnInit } from '@angular/core';
import {CodeSendService} from "../../shared/services/code-transmission/code-send.service";
import {UserService} from "../../shared/services/user/user.service";
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
  serverResponse = "";

  scripts: Script[] = [];
  currentScript?: Script;

  constructor(
    private route: ActivatedRoute,
    private codeSendService: CodeSendService,
    private userService: UserService,
    private scriptService: ScriptService
  ) { }

  ngOnInit(): void {
    this.scriptService.getUserScripts(this.userService.getUserId())
      .subscribe((response: Script[]) => {
        this.scripts = response;
        const scriptId = this.route.snapshot.paramMap.get('id');
        if (scriptId) {
          this.currentScript = this.scripts.find(script => script.id === scriptId);
          if (!this.currentScript) {
            this.currentScript = this.scriptService.getScriptStarter(this.userService.getUserId());
          }
        } else {
          this.currentScript = this.scriptService.getScriptStarter(this.userService.getUserId());
        }
      });
  }

  testScript() {
  }
}
