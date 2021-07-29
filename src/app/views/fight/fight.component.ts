import { Component, OnInit } from '@angular/core';
import {Script} from "../../shared/models/scripts/script.model";
import {ScriptService} from "../../shared/services/scripts/script.service";
import {UserService} from "../../shared/services/user/user.service";
import {FightService} from "../../shared/services/fights/fight.service";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../shared/models/user/user.model";
import {Fight} from "../../shared/models/fight/fight";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {

  scripts: Script[] = [];
  opponents: User[] = [];

  opponentsIcon = faUsers;
  isLoading: boolean = false;

  constructor(
    private fightService: FightService,
    private scriptService: ScriptService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getOpponents();
    this.getUserScripts();
  }

  getOpponents() {
    this.userService.getOpponents(this.userService.getUserId())
      .subscribe((response: User[]) => {
        this.opponents = response;
      });
  }

  getUserScripts() {
    this.scriptService.getUserScripts(this.userService.getUserId())
      .subscribe((response: Script[]) => {
        this.scripts = response;
      });
  }

  fight(opponent: User) {
    this.isLoading = true;
    console.log(this.scripts)
    const script = this.scripts.filter(script => script.isDefense);
    console.log(script)
    this.fightService.runFight(script[0], opponent.id)
      .subscribe(
        (response: Fight) => {
          console.log(response)
          this.isLoading = false;
        },
        err => console.log(err));
  }

}
