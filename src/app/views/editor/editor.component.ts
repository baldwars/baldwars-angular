import { Component, OnInit } from '@angular/core';
import {CodeSendService} from "../../shared/services/code-transmission/code-send.service";
import {UserService} from "../../shared/services/user/user.service";
import {ScriptService} from "../../shared/services/scripts/script.service";
import {Script} from "../../shared/models/scripts/script.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {ScriptNameDialogComponent} from "./script-name-dialog/script-name-dialog.component";
import {NotifierService} from "angular-notifier";
import {FightService} from "../../shared/services/fights/fight.service";
import {Fight} from "../../shared/models/fight/fight";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'c'};
  serverResponse = "";

  scriptForm: FormGroup = this.formBuilder.group({
    owner: [this.userService.getUserId()],
    name: ['No name'],
    content: [this.scriptService.getScriptStarter(this.userService.getUserId()).content],
    isDefense: [false]
  });

  scripts: Script[] = [];
  currentScript: Script = {content: "", id: "", isDefense: false, name: "", owner: ""};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private codeSendService: CodeSendService,
    private userService: UserService,
    private scriptService: ScriptService,
    private fightService: FightService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserScripts();
  }

  getUserScripts() {
    this.scriptService.getUserScripts(this.userService.getUserId())
      .subscribe((response: Script[]) => {
        this.scripts = response;
        this.getCurrentScript();
        this.scriptForm?.patchValue({
          owner: this.currentScript.owner,
          name: this.currentScript.name,
          content: this.currentScript.content,
          isDefense: this.currentScript.isDefense
        });
      });
  }
  testScript(script: Script) {
    this.fightService.testScript(script).subscribe((response: Fight) => {
      console.log(response)
    },
      error => this.notifierService.notify('error', error.error.message()));
  }

  selectScript(event: MatSelectChange) {
    console.log(event)
    const scriptName = event.value;
    this.currentScript = this.scripts.filter(script => script.name === scriptName)[0];

    this.scriptForm?.patchValue({
      owner: this.currentScript.owner,
      name: this.currentScript.name,
      content: this.currentScript.content,
      isDefense: this.currentScript.isDefense
    });
  }

  private getCurrentScript() {
    const scriptId = this.route.snapshot.paramMap.get('id') || undefined;

    if (this.scripts.length === 0) {
      this.currentScript = this.scriptService.getScriptStarter(this.userService.getUserId());
    }
    else if (!scriptId) {
      this.currentScript = this.scripts[0];
    }
    else {
      this.currentScript = (this.scripts.filter(script => script.id === scriptId))[0];
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ScriptNameDialogComponent, {
      width: '30%',
      data: this.scriptService.getScriptStarter(this.userService.getUserId())
    });

    dialogRef.afterClosed().subscribe((result: Script) => {
      this.saveScript(result);
    });

  }

  saveScript(request: Script) {
    this.scriptService.save(request).subscribe(response => {
          if (response.status === 201) {
            const splitUrl = response.headers.get('location')?.split('/');
            const id = splitUrl![splitUrl!.length - 1];
            this.router.navigate(['editor', id]).then();
          }

          this.getUserScripts();
        },
        error => {
          if (error.status === 409) {
            this.notifierService.notify('error', `You already have a file named: ${request.name}`);
          }
        }
    );
  }
}
