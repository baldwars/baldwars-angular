import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./modules/angular-material.module";
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthenticationInterceptor } from "./shared/services/authentication/authentication.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { EditorComponent } from './views/editor/editor.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NotifierModule } from "angular-notifier";
import { notifierOptions } from './notifier.config';
import { MonacoEditorModule } from "ngx-monaco-editor";
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { DocumentationComponent } from './views/documentation/documentation.component';
import { FightComponent } from './views/fight/fight.component';
import { LobbyComponent } from './views/lobby/lobby.component';
import { LeekSelectionComponent } from './views/lobby/leek-selection/leek-selection.component';
import { WeaponDetailsDialogComponent } from './views/dashboard/weapon-details-dialog/weapon-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditorComponent,
    DashboardComponent,
    LeaderboardComponent,
    DocumentationComponent,
    FightComponent,
    LobbyComponent,
    LeekSelectionComponent,
    WeaponDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    MonacoEditorModule.forRoot(),
    NotifierModule.withConfig(notifierOptions),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
