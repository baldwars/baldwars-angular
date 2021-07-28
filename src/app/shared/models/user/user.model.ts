import {Warrior} from "../warrior/warrior.model";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  eloPoints: number;
  xp: number;
  maxXp: number;
  level: number;
  baldCoins: number;
  warrior: Warrior;
}
