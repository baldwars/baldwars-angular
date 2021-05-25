import {User} from "../user/user.model";

export interface Session {
  token: string;
  user: User;
}
