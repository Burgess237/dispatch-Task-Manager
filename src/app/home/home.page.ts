import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../task';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FirebaseStorage } from '@angular/fire';
import { ViewTaskComponent } from './view-task/view-task.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [];
  filtered: Task[] = [];

  constructor(
    private firebaseService: FirebaseService,
    public modalController: ModalController,
    public authService: AuthService,
    public db: AngularFirestore,
    public toast: ToastController
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
      this.removeComplete();
    });
  }

  removeComplete() {
    console.log(this.tasks.filter(task => task.status === 'active'));
  }

  filterTasks(event) {
  const searchTerm = event.detail.value;
  this.filtered = this.tasks.filter(task => task.taskName === searchTerm);
  console.log(this.filtered);
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

  editAccount() {
    console.log(this.authService.userData);
  }

  markTaskComplete(task) {

    const currentTask = task;
    currentTask.status='complete';

    this.firebaseService.updateTask(currentTask).then(() => {
      this.presentCompleteToast(task);
    });
  }

  undoCompletedTask(task) {
    this.firebaseService.updateTask(task).then();
  }

  // Toast
  async presentCompleteToast(task) {
    const toast = await this.toast.create({
      message: 'Task: ' + task.id + ' marked complete',
      buttons: [
        {
          side: 'end',
          icon: 'return-up-back-outline',
          text: 'Undo',
          handler: () => {
            this.undoCompletedTask(task);
          }
        }
      ],
      duration: 2000
    });
    await toast.present();

  }

}
