import {Component, Input, OnInit} from '@angular/core';
import {faCoins, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { Router } from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userIcon = faUserAlt;
  baldCoinsIcon = faCoins;

  user?: User;
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
        this.userService.getCurrentUser().subscribe((response: User) => {
          this.user = response;
          this.username = this.userService.getUserUsername();
        });
      }
    });
  }

  ngOnInit(): void {
    this.authService.getEmitter().subscribe(() => {
      this.isLogged = true;
    });
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['login']).then();
  }

}
