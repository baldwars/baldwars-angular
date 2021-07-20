import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/user/user.model";
import {UserService} from "../../shared/services/user/user.service";
import {BehaviorSubject} from "rxjs";
import {filter} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {LeekSelectionComponent} from "./leek-selection/leek-selection.component";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  /*opponentList: Array<User> = [
    {
      id: "1",
      username: "1",
      rank: 1,
      firstName: "1",
      lastName: "1",
      email: "email@email.com"
    },
    {
      id: "2",
      username: "2",
      rank: 2
    },
    {
      id: "3",
      username: "3",
      rank: 3
    },
    {
      id: "4",
      username: "4",
      rank: 4
    },
    {
      id: "5",
      username: "5",
      rank: 5
    }
  ];*/

  opponents: any[] = [];
  isLoading: boolean = true;
  loadingEmitter$ = new BehaviorSubject<boolean>(this.isLoading);

  counter = 0;
  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
/*    this.getUsers();
    console.log(this.opponents);*/
    this.getOpponents();
    // setTimeout(() => console.log(this.opponents), 2000);
  }

/*  getAllUsers() {
    this.userService.getAllUsers()
      .then(res => {
        /!*        console.log(typeof res);
                console.log(res);*!/
        this.opponents = res;
      });
  }*/

  getOpponents() {
    this.userService.getAllUsers()
      .subscribe(res => {
          console.log('res');
          console.log(res);
          let filteredRes = res.filter(opponent => opponent.id != this.userService.getCurrentUser()?.id);
          filteredRes = filteredRes.filter(opponent => opponent.rank == this.userService.getCurrentUser()?.eloScore);
          console.log(filteredRes);
          if (filteredRes.length > 5)
            filteredRes = filteredRes.slice(0,6);
          this.opponents = filteredRes;
          this.isLoading = false;
/*          this.loadingEmitter$.next(this.isLoading);
          console.log(this.loadingEmitter$);
          console.log(this.opponents)*/
        },
        err => {
          console.log('err')
          console.log(err)
        });
  }

  fightOpponent(opp: any) {
    console.log(`fightOpponent(${ opp.username })`);
  }

  chooseLeek() {
    console.log('chooseLeek()');
    const dialogRef = this.dialog.open(LeekSelectionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  fun(id: number) {
    this.userService.getUserWarrior(id).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
}
