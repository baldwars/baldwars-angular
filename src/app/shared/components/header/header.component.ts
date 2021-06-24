import {Component, Input, OnInit} from '@angular/core';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { User } from "../../models/user/user.model";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userIcon = faUserAlt;

  currentUser?: User;
  isLogged: boolean = false;

  @Input() sidenav: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isLogged().then(logged => {
      this.isLogged = logged;
      if (this.isLogged) {
        this.currentUser = this.authService.session()?.user;
      }
    });
  }

  ngOnInit(): void {
    this.authService.getEmitter().subscribe(() => {
      this.isLogged = true;
      this.currentUser = this.authService.session()?.user;
    });
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['login']).then();
  }

}
