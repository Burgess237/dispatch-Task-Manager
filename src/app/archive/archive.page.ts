import { TmplAstElement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UpdateTaskComponent } from '../home/update-task/update-task.component';
import { FirebaseService } from '../services/firebase.service';
import { Task } from '../task';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {

  archivedTasks: Task[] = [];

  constructor(
    public firestore: FirebaseService,
    public modalController: ModalController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(event?) {
    this.firestore.archivedTasks().subscribe((res: any) => {
      if(res){
        this.archivedTasks = res.map(e => {
          const data = e.payload.doc.data();
          const id = e.payload.doc.id;
          return {id, ...data};
        });
          if(event) {
            event.target.complete();
          }
      }
    });
  }


  async openCompletedTask(currentTask) {
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

  unArchiveTask(task: Task) {
    const currentTask = task;
    currentTask.archived = false;
    this.firestore.updateTask(currentTask).then(() => {
      this.showToast();
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Task Archived',
      duration: 2000
    });

   return await toast.present();
  }
}
