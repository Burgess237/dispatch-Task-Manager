import { Component } from '@angular/core';
import { AlertController, MenuController, Platform } from '@ionic/angular';

import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from './services/user';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  currentUser: User;

  public hasPermission: boolean;
  public token: string;
  constructor(
    public plt: Platform,
    public router: Router,
    public menuController: MenuController,
    public alertController: AlertController,
    public auth: AuthService,
    public geolocationService: GeolocationService
    ) {
    this.plt.ready()
    .then(() => {
      console.log('App Ready');
      if(this.auth.isLoggedIn){
        this.currentUser = JSON.parse(localStorage.getItem('user'));
         this.geolocationService.watchPosition();
      }
    });

    this.router.events.subscribe((res: RouterEvent) => {
      if(this.menuController.isOpen()) {
        this.menuController.close();
      }
      this.menuController.enable(true);
    });




  }


}
