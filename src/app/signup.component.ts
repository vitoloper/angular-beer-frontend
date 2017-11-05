import { Component, OnInit} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Router }            from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './templates/signup.component.html'
})
export class SignupComponent {
  // model (bind in template)
  model = {email: 'signup@test.com', password: 'signup'};
  signupResult = '';

  constructor (private authService: AuthService, private router: Router) {
    console.log('LoginComponent constructor called.');
  }
  
  // Form submit
  onSubmit() {
    console.log('Login button clicked ', this.model);
    this.authService.signup(this.model.email, this.model.password)
      .then(result => {
        if (result) {
          console.log('Signup successful');
          this.authService.updateData(result);
          // this.router.navigate(['/protected']);
        } else {
          console.log('Signup failed');
        }
      }, err => {  console.log('SignupComponent login error: ', err) });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
