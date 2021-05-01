import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  signUp(email, password) {
    this.authService.registerUser(email.value, password.value).then(res => {
      this.authService.sendVerificationEmail();
      this.router.navigate(['verify-email']);
    }).catch(error => {
      window.alert(error.message);
    });
  }

}
