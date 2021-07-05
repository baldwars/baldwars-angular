import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user/user.model";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  dataSource: any[] = [];
  columns: string[] = ['username', 'rank'];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fillDataSource();
    // setTimeout(() => console.log('dataSource : ' + this.dateSource.length), 2000);
  }

  private fillDataSource() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.dataSource = res.sort((a, b) => {
          return b-a;
        });
      },
      err => {
        console.log('err');
        console.log(err);
      }
    );
  }
}
