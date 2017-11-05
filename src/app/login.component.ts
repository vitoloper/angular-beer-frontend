import { Component, OnInit} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Router }            from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './templates/login.component.html'
})
export class LoginComponent {
  // model (bind in template)
  model = {email: 'test@test.com', password: 'test'};
  loginResult = '';

  constructor (private authService: AuthService, private router: Router) {
    console.log('LoginComponent constructor called.');
  }
  
  // Form submit
  onSubmit() {
    console.log('Login button clicked ', this.model);
    this.authService.login(this.model.email, this.model.password)
      .then(result => {
        if (result) {
          console.log('Login successful');
          this.authService.updateData(result);
          // this.router.navigate(['/protected']);
        } else {
          console.log('Login failed');
        }
      }, err => {  console.log('LoginComponent login error: ', err) });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
