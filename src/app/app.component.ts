import { Component } from '@angular/core';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated/typings/INotificationPayload';

import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from './services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  currentUser: User;

  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;


  constructor(public plt: Platform, public router: Router,
    public menuController: MenuController,
    public alertController: AlertController,
    public auth: AuthService) {
    this.plt.ready()
    .then(() => {
      console.log('App Ready');
      if(this.auth.isLoggedIn){
        this.currentUser = JSON.parse(localStorage.getItem('user'));
      }
    });

    this.router.events.subscribe(res => {
      if(this.menuController.isOpen()) {
        this.menuController.close();
      }
    });

  }

}
