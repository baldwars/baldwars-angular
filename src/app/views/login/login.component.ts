import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Credentials} from "../../shared/models/authentication/credentials.model";
import {NotifierService} from "angular-notifier";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async login(credentials: Credentials): Promise<void> {
    const res = await this.authService.login(credentials.username, credentials.password)

    if (!await this.authService.isLogged()) {
      this.notifierService.notify('error', 'Invalid credentials.')
    }

    await this.router.navigate(['dashboard']);
  }

}
