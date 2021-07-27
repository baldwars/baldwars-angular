import {UserSession} from "./user-session.model";

export interface Session {
  token: string;
  user: UserSession;
}
