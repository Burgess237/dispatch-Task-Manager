import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { CreateTaskComponent } from './create-task/create-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: any;

  panelOpenState = false;

  constructor(private angularFirestore: AngularFirestore, public modalController: ModalController, public authService: AuthService
     ) { }

  ngOnInit() {
  }

  /** Fetch data from firebase realtime database */
  getTasks() {
    this.tasks = this.angularFirestore.collection('/tasks').snapshotChanges();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateTaskComponent,
      cssClass: 'create-task-modal',
      swipeToClose: true,
      componentProps: {
        // Pass User to track who created it?
        user: this.authService.userData
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

}
