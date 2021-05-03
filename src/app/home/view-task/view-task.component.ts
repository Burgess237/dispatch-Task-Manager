import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {

  @Input() task: Task;

  constructor(public modalController: ModalController, public firebase: FirebaseService, public toast: ToastController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

  markComplete() {
    const currentTask = this.task;
    currentTask.status='complete';
    this.firebase.updateTask(currentTask).then(res => {
      this.presentCompleteToast(this.task);
    });
  }

  undoCompletedTask(task) {
    const currentTask = this.task;
    currentTask.status='active';
    this.firebase.updateTask(currentTask);
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
