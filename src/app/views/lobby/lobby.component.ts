import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user/user.model";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  opponentList: Array<User> = [
    {
      id: "1",
      username: "1",
      eloScore: 1
    },
    {
      id: "2",
      username: "2",
      eloScore: 2
    },
    {
      id: "3",
      username: "3",
      eloScore: 3
    },
    {
      id: "4",
      username: "4",
      eloScore: 4
    },
    {
      id: "5",
      username: "5",
      eloScore: 5
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
