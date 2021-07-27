import {User} from "../user/user.model";

export interface Fight {
  id: string;
  striker: User;
  defender: User;
  winner: string;
  overview: any;
}
