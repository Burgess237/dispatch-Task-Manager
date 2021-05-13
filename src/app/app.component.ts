import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated/typings/INotificationPayload';

import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;

  currentUser: User;

  constructor(public plt: Platform, private fcm: FCM, private location: Location,
    public alertController: AlertController,
    public auth: AuthService) {
    this.plt.ready()
    .then(() => {
      console.log('App Ready');
      this.setUpFCM();
    });
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    this.plt.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this.location.isCurrentPathEqualTo('/home')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this.location.back();

      }

    });

    this.plt.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      });
    });
  }

  async setUpFCM() {
    console.log('FCM setup started');

    if (!this.plt.is('cordova')) {
      return;
    }
    console.log('In cordova platform');

    console.log('Subscribing to token updates');
    this.fcm.onTokenRefresh().subscribe((newToken) => {
      this.token = newToken;
      console.log('onTokenRefresh received event with: ', newToken);
    });

    console.log('Subscribing to new notifications');
    this.fcm.onNotification().subscribe((payload) => {
      this.pushPayload = payload;
      console.log('onNotification received event with: ', payload);
    });

    this.hasPermission = await this.fcm.requestPushPermission();
    console.log('requestPushPermission result: ', this.hasPermission);

    this.token = await this.fcm.getToken();
    console.log('getToken result: ', this.token);

    this.pushPayload = await this.fcm.getInitialPushPayload();
    console.log('getInitialPushPayload result: ', this.pushPayload);
  }

  public get pushPayloadString() {
    return JSON.stringify(this.pushPayload, null, 4);
  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}
