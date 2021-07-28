import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user/user.model";
import {UserService} from "../../shared/services/user/user.service";
import {WarriorService} from "../../shared/services/warrior/warrior.service";
import {Warrior} from "../../shared/models/warrior/warrior.model";
import {NotifierService} from "angular-notifier";
import {WeaponStore} from "../../shared/models/weapons/weaponStore.model";
import {WeaponService} from "../../shared/services/weapon/weapon.service";
import {MatDialog} from "@angular/material/dialog";
import {WeaponDetailsDialogComponent} from "./weapon-details-dialog/weapon-details-dialog.component";
import {ScriptService} from "../../shared/services/scripts/script.service";
import {Script} from "../../shared/models/script.model";
import {
  faChartBar,
  faFan,
  faFileCode,
  faHeart, faHistory, faPlus,
  faShoePrints,
  faStar,
  faTerminal,
  faUserNinja
} from "@fortawesome/free-solid-svg-icons";
import {Fight} from "../../shared/models/fight/fight";
import {FightService} from "../../shared/services/fights/fight.service";
import {Router} from "@angular/router";
import {FightHistory} from "../../shared/models/fight/FightHistory";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser?: User;
  warrior?: Warrior;
  weapons?: WeaponStore[];
  scripts?: Script[];
  fights?: Fight[];
  displayedFights?: FightHistory[];
  isLoading: boolean = true;
  progressTooltip = "";

  victories?: number;
  draws?: number;
  defeats?: number;

  terminalIcon = faTerminal;
  scriptIcon = faFileCode;
  warriorIcon = faUserNinja;
  userIcon = faChartBar;
  weaponsIcon = faFan;
  fightsIcon = faHistory;
  healthPointsIcon = faHeart;
  movePointsIcon = faShoePrints;
  actionPointsIcon = faStar;
  plusIcon = faPlus

  constructor(
    private userService: UserService,
    private warriorService: WarriorService,
    private notifierService: NotifierService,
    private weaponService: WeaponService,
    private scriptService: ScriptService,
    private fightService: FightService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((response: User) => {
      this.currentUser = response;
      this.warrior = this.currentUser?.warrior;
      this.isLoading = false;
    });

    this.weaponService.getUserWeapons(this.userService.getUserId()).subscribe(
      (response: WeaponStore[]) => {
        this.weapons = response;
        this.isLoading = false;
      },
      () => {
        this.notifierService.notify('error', 'The user does not exist.')
      }
    );

    this.scriptService.getUserScripts(this.userService.getUserId()).subscribe(
      (response: Script[]) => {
        this.scripts = response;
      }
    )

    this.fightService.getUserFightsHistory(this.userService.getUserId())
      .subscribe((response: Fight[]) => {
        this.fights = response;
        this.getFightsStats();
        this.displayedFights = this.fights.map((fight: Fight) => {
          const color = this.getFightColor(fight);
          return new FightHistory(fight, color);
        })
      });
  }

  getFightsStats() {
    this.victories = this.getFightVictories();
    this.draws = this.getFightDraws();
    this.defeats = this.getFightDefeats();
  }

  skillUp(skill: string) {
    if (this.warrior && this.warrior?.skillPoints > 0) {
      this.warriorService.updateWarriorSkill(this.warrior.id, skill, 1)
        .subscribe((response: Warrior) => {
          this.warrior = response;
        });
    }
  }

  getFightVictories(): number {
    if (this.fights !== undefined) {
      return this.fights.filter(fight => fight.winner === this.currentUser?.id).length;
    }

    return 0;
  }

  getFightDraws(): number {
    if (this.fights !== undefined) {
      return this.fights.filter(fight => fight.winner === null).length;
    }

    return 0;
  }

  getFightDefeats(): number {
    if (this.fights !== undefined) {
      return this.fights.filter(fight => fight.winner !== this.currentUser?.id).length;
    }

    return 0;
  }

  displayXpProgress() {
    if (this.currentUser) {
      this.progressTooltip = `XP : ${ this.currentUser.xp * 100 / this.currentUser.maxXp }%`;
    }
  }

  openDialog(name: string, level: number, damage: number, cost: number, minRange: number, maxRange: number) {
    this.dialog.open(WeaponDetailsDialogComponent, {
      data: {
        name: name,
        level: level,
        damage: damage,
        cost: cost,
        minRange: minRange,
        maxRange: maxRange,
      }
    });
  }

  editScript(script: Script) {
    this.router.navigate(['editor', script.id]).then();
  }

  getFightColor(fight: Fight): string {
    if (fight.winner === this.currentUser?.id) {
      return 'lightGreen';
    }
    else if (fight.winner === null) {
      return 'lightGray';
    }

    return 'lightCoral';
  }
}
