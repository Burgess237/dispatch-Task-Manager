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
        this.archivedTasks = res.map(e=> ({
          id: e.payload.doc.id,
          taskName: e.payload.doc.data().taskName,
          creationDate: e.payload.doc.data().creationDate,
          dueDate: e.payload.doc.data().dueDate,
          priority: e.payload.doc.data().priority,
          status: e.payload.doc.data().status,
          collectFrom: e.payload.doc.data().collectFrom,
          deliverTo: e.payload.doc.data().deliverTo,
          collectLocation: e.payload.doc.data().collectLocation,
          deliverLocation: e.payload.doc.data().deliverLocation,
          description: e.payload.doc.data().description,
          archived: e.payload.doc.data().archived
        }));
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
