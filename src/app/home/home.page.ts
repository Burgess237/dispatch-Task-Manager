import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../task';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { Router } from '@angular/router';
import { User } from '../services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [];
  taskBackup: Task[] = [];
  filtered: Task[] = [];
  usersList: User[];
  currentUser;
  accountManagerSearch;
  constructor(
    private firebaseService: FirebaseService,
    public modalController: ModalController,
    public authService: AuthService,
    public db: AngularFirestore,
    public toast: ToastController,
    private firebaseAuth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    // Fetch tasks from firebase
    this.fetchTasks();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.fetchUsers();
  }

  fetchTasks(event?) {
    this.firebaseService.tasksInDueDateOrder().subscribe((res: any) => {
      if(res){
        this.tasks = res.map(e => {
          const id = e.payload.doc.id;
          const data = e.payload.doc.data();
          data.id = id;
          return {id, ...data};
        });
      }
      if(event) {
        event.target.complete();
      }
    });
  }

  fetchUsers() {
    this.firebaseService.getUsers().subscribe((res: any) => {
      if(res) {
        this.usersList = res.map(e => {
          const data = e.payload.doc.data();
          const id = e.payload.doc.id;
          data.id = id;
          return {id, ...data};
        });
    }});
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
      presentingElement: await this.modalController.getTop()
      // Get the top-most ion-modal
    });
    return await modal.present();
  }

  async updateTaskModal(currentTask) {
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

  async viewTaskModel(currentTask: Task) {
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

  markTaskComplete(task) {

    const currentTask = task;
    currentTask.status='complete';

    this.firebaseService.updateTask(currentTask).then(() => {
      this.presentCompleteToast(task);
    });
  }

  undoCompletedTask(task) {
    const currentTask = task;
    currentTask.status='active';
    this.firebaseService.updateTask(task);
  }

  // Toast
  async presentCompleteToast(task) {
    const toast = await this.toast.create({
      message: 'Task marked complete',
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

  filterAccountManager(event) {
    this.accountManagerSearch = event.detail.value;
  }



}
