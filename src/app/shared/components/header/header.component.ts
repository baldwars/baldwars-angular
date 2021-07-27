import {Component, Input, OnInit} from '@angular/core';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { Router } from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userIcon = faUserAlt;

  username?: string;
  isLogged: boolean = false;

  @Input() sidenav: any;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isLogged().then(logged => {
      this.isLogged = logged;
      if (this.isLogged) {
        this.username = this.userService.getUserUsername();
      }
    });
  }

  ngOnInit(): void {
    this.authService.getEmitter().subscribe(() => {
      this.isLogged = true;
      this.username = this.userService.getUserUsername();
    });
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['login']).then();
  }

}
