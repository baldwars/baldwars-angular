import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from './guards/no-auth.guard';
import {EditorComponent} from "./views/editor/editor.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {DocumentationComponent} from "./views/documentation/documentation.component";
import {LeaderboardComponent} from "./views/leaderboard/leaderboard.component";
import {FightComponent} from "./views/fight/fight.component";
import {LobbyComponent} from "./views/lobby/lobby.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard] },
  { path: 'fight', component: FightComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: 'lobby', component: LobbyComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
