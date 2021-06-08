import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user/user.model";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser?: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

}
