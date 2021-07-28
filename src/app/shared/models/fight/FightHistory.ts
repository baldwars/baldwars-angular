import {Fight} from "./fight";
import {User} from "../user/user.model";

export class FightHistory {
  id: string;
  striker: User;
  defender: User;
  winner: string;
  color: string;

  // constructor(id: string, striker: string, defender: string, winner: string, color: string) {
  constructor(fight: Fight, color: string) {
    this.id = fight.id;
    this.striker = fight.striker;
    this.defender = fight.defender;
    this.winner = fight.winner;
    this.color = color;
  }
}
