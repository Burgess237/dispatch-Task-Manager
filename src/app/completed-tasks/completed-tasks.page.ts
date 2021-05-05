import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateTaskComponent } from '../home/update-task/update-task.component';
import { FirebaseService } from '../services/firebase.service';
import { Task } from '../task';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
})
export class CompletedTasksPage implements OnInit {

  completedTasks: Task[] = [];

  constructor(public firestore: FirebaseService, public modalController: ModalController) { }

  ngOnInit() {
    this.firestore.getTasks().subscribe((res: any) => {
      if(res){
        this.completedTasks = res.map(e=> ({
          id: e.payload.doc.id,
          taskName: e.payload.doc.data().taskName,
          creationDate: e.payload.doc.data().creationDate,
          dueDate: e.payload.doc.data().dueDate,
          priority: e.payload.doc.data().priority,
          status: e.payload.doc.data().status,
          collectFrom: e.payload.doc.data().collectFrom,
          deliverTo: e.payload.doc.data().deliverTo,
          collectLocation: e.payload.doc.data().collectLocation,
          deliverLocation: e.payload.doc.data().deliverLocation
        }));
          this.removeComplete();
      }
    });
  }

  removeComplete() {
    this.completedTasks = this.completedTasks.filter(task => task.status === 'complete');
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

}
