import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './security/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  showLoginPage() {
    return !this.authenticationService.isUserLoggedIn();
  }

  isAdmin(){
    return this.authenticationService.hasAdminAuthority();
  }
  logout(){
    this.authenticationService.logOut();
  }
}
