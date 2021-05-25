import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";
import * as XRegExp from 'xregexp'

export class AccountValidator extends Validators{
  static names(control: AbstractControl): ValidationErrors | null {
    const nameRegExp = XRegExp('^[\\p{L}\'][ \\p{L}\'-]*[\\p{L}]$');

    if (!nameRegExp.test(control.value)) {
      return { validName: true };
    }

    return null;
  }

  static username(control: AbstractControl): ValidationErrors | null {
    const usernameRegExp = XRegExp('^[\\p{L}0-9_]{5,20}$');

    if (!usernameRegExp.test(control.value)) {
      return { validUsername: true };
    }

    return null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegExp.test(control.value) || control.value.length > 256) {
      return { validEmail: true };
    }

    return null;
  }

  static password(control: AbstractControl): ValidationErrors | null {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegExp.test(control.value)) {
      return { validPassword: true };
    }

    return null;
  }
}
