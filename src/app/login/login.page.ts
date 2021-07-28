import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, public router: Router, private platform: Platform, private menu: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  logIn(email, password) {
    this.authService.signIn(email.value, password.value)
    .then((res) => {
      if(this.authService.isEmailVerified) {
        this.router.navigate(['home']);
      } else {
        window.alert('Email is not verified');
        return false;
      }
    });
  }

}
