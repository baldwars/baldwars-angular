import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user/user.model";
import {UserService} from "../../shared/services/user/user.service";
import {WarriorService} from "../../shared/services/warrior/warrior.service";
import {Warrior} from "../../shared/models/warrior/warrior.model";
import {AuthenticationService} from "../../shared/services/authentication/authentication.service";
import {NotifierService} from "angular-notifier";
import {SkillCosts} from "../../shared/models/warrior/skill-costs";
import {SkillGain} from "../../shared/models/warrior/skill-gain";
import {WeaponStoreModel} from "../../shared/models/weapons/weaponStore.model";
import {WeaponService} from "../../shared/services/weapon/weapon.service";
import {MatDialog} from "@angular/material/dialog";
import {WeaponDetailsDialogComponent} from "./weapon-details-dialog/weapon-details-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser?: User;
  warrior?: Warrior;
  weapons?: any;
  isLoading: boolean = true;
  progressTooltip = "";

  constructor(
    private userService: UserService,
    private warriorService: WarriorService,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private weaponService: WeaponService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.warrior = this.currentUser?.warrior;
    this.weaponService.getUserWeapon().subscribe(
      res => {
        this.weapons = res
        console.log(this.weapons)
      },
      err => {
        console.log("err")
        console.log(err)
      }
    )
    this.isLoading = false;
  }

  saveSkillPoints() {
    console.log("saveSkillPoints");
  }

  increaseHealth() {
    if (this.warrior && this.warrior.skillPoints - SkillCosts.HEALTH_COST >= 0) {
      this.warrior.skillPoints -= SkillCosts.HEALTH_COST;
      this.warrior.health += SkillGain.HEALTH_GAIN;
    }
    else {
      this.notifierService.notify("error", "You do not have enough skill points.")
    }
  }

  increaseMoves() {
    if (this.warrior && this.warrior.skillPoints - SkillCosts.MOVE_COST > 0) {
      this.warrior.skillPoints -= SkillCosts.MOVE_COST;
      this.warrior.moves += SkillGain.MOVE_GAIN;
    }
    else {
      this.notifierService.notify("error", "You do not have enough skill points.")
    }
  }

  increaseActions() {
    if (this.warrior && this.warrior.skillPoints - SkillCosts.ACTION_COST > 0) {
      this.warrior.skillPoints -= SkillCosts.ACTION_COST;
      this.warrior.actions += SkillGain.ACTION_GAIN;
    }
    else {
      this.notifierService.notify("error", "You do not have enough skill points.")
    }
  }

  increaseSp() {
    this.userService.increaseSkillPoints().subscribe(
      res => {
        console.log("res : ");
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

/*  updateLocalStorage() {
    AuthenticationService.setSessionToLocalStorage(this.authenticationService.session().token, this.currentUser);
  }*/


  decreaseHealth() {
    if (this.warrior && this.warrior.health - SkillGain.HEALTH_GAIN >= 100) {
      this.warrior.skillPoints += SkillCosts.HEALTH_COST;
      this.warrior.health -= SkillGain.HEALTH_GAIN;
    }
    else {
      this.notifierService.notify("error", "Health cannot be less than 100.")
    }
  }

  decreaseMoves() {
    if (this.warrior && this.warrior.moves - SkillGain.MOVE_GAIN >= 3) {
      this.warrior.skillPoints += SkillCosts.MOVE_COST;
      this.warrior.moves -= SkillGain.MOVE_GAIN;
    }
    else {
      this.notifierService.notify("error", "Moves cannot be less than 30.")
    }
  }

  decreaseActions() {
    if (this.warrior && this.warrior.actions - SkillGain.ACTION_GAIN >= 10) {
      this.warrior.skillPoints += SkillCosts.ACTION_COST;
      this.warrior.actions -= SkillGain.ACTION_GAIN;
    }
    else {
      this.notifierService.notify("error", "Actions cannot be less than 10.")
    }
  }

  updateWarrior() {
    if (this.warrior) {
      this.warriorService.updateWarrior(this.warrior).subscribe(
        res => {
          this.warrior = res;
          AuthenticationService.setSessionToLocalStorage(
            this.authenticationService.session().token,
            this.currentUser
          );
          this.notifierService.notify("success", "Skill points saved.")
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  displayXpProgress() {
    this.progressTooltip = `XP : ${ this.currentUser?.xp }/${ this.currentUser?.maxXp }`;
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
}
