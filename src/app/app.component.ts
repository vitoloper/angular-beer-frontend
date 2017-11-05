import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './templates/app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedInBoolean: boolean = false;
  loginStatus = 'No data';
  
  // Class constructor
  constructor (private authService: AuthService, private router: Router) {}
  
  // On page init
  ngOnInit(): void {
    this.authService.getData().subscribe((data) => {
      this.loggedInBoolean = true;
      this.loginStatus = data.name;
    }, (error) => { console.log(error); });
    
    this.authService.getUserData()
      .then((result) => this.loggedIn(result), (error) => this.handleError(error));
  }
  
  private loggedIn(result: any) {
    console.log(result);
    this.loggedInBoolean = true;
    this.loginStatus = 'Logged in as ' + result.name;
  }

  private handleError (error: any) {
    console.log(error);
    this.loggedInBoolean = false;
    this.loginStatus = 'Not logged in';
  }
  
  private doLogout(): void {
    this.authService.logout()
      .then((result) => { 
        console.log(result);
        this.loggedInBoolean = false;
        this.loginStatus = 'Not logged in';
        // Go to welcome page
        this.router.navigate(['/welcome']);
      }, 
      (error) => { 
        this.loggedInBoolean = false;
        console.log(error);
        this.loginStatus = 'ERROR';
      });
  }
  
}
