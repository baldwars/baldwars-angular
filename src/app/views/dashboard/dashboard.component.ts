import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user/user.model";
import {UserService} from "../../shared/services/user/user.service";
import {WarriorService} from "../../shared/services/warrior/warrior.service";
import {Warrior} from "../../shared/models/warrior/warrior.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser?: User;
  warrior?: Warrior;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private warriorService: WarriorService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.getWarrior();
  }

  getWarrior() {
    console.log(this.currentUser);
    this.warriorService.getAllWarriors().subscribe(
      res => {
        this.warrior = res.filter(warrior => warrior.owner == this.currentUser?.id)[0];
        this.isLoading = false;
        console.log(this.warrior)
      },
      err => {
        console.log(err)
      }
    );
  }
}
