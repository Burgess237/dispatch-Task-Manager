import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../task';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FirebaseStorage } from '@angular/fire';
import { ViewTaskComponent } from './view-task/view-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [];

  panelOpenState = false;

  constructor(
    private firebaseService: FirebaseService,
    public modalController: ModalController,
    public authService: AuthService,
    public db: AngularFirestore
     ) { }

  ngOnInit() {
    // Fetch tasks from firebase
    this.firebaseService.getTasks().subscribe((res: any) => {
      if(res){
        this.tasks = res.map(e=> ({
            id: e.payload.doc.id,
            taskName: e.payload.doc.data().taskName,
            creationDate: e.payload.doc.data().creationDate,
            dueDate: e.payload.doc.data().dueDate,
            priority: e.payload.doc.data().priority,
            extraInfo: e.payload.doc.data().extraInfo,
            status: e.payload.doc.data().status
          }));
      }
    });
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

  async updateTaskModal(currentTask) {
    console.log(currentTask);
    const modal = await this.modalController.create({
      component: UpdateTaskComponent,
      cssClass: 'update-task-modal',
      swipeToClose: true,
      componentProps: {
        task: currentTask,
      },
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

  async viewTaskModel(currentTask) {
    console.log(currentTask);
    const modal = await this.modalController.create({
      component: ViewTaskComponent,
      cssClass: 'view-task-modal',
      swipeToClose: true,
      componentProps: {
        task: currentTask,
      },
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

}
