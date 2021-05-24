import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../shared/services/authentication/authentication.service";
import { NewAccount } from "../../shared/models/user/new-account.model";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { first } from "rxjs/operators";
import { AccountValidator } from "../../shared/validators/account.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private authService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, AccountValidator.names]],
      lastName: ['', [Validators.required, AccountValidator.names]],
      username: ['', [Validators.required, AccountValidator.username]],
      email: ['', [Validators.required, AccountValidator.email]],
      password: ['', [Validators.required, AccountValidator.password]]
    });
  }

  ngOnInit(): void {
  }

  register(account: NewAccount): void {
    this.authService.register(account)
      .pipe(first())
      .subscribe(async () => {
        this.notifierService.notify('success', 'You registered successfully! You can now log in.');
        await this.router.navigate(['login']);
      }, () => {
        this.notifierService.notify('error', 'User account already exists.');
      });
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
}
