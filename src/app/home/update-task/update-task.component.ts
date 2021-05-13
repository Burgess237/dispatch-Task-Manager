import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {

  @Input() task: Task;
  currentTask;

  constructor(
    public firebaseService: FirebaseService,
    public modalController: ModalController,
    private toast: ToastController,
    public auth: AuthService) { }

  ngOnInit() {
    this.currentTask = new FormGroup({
      id: new FormControl(this.task.id),
      taskName: new FormControl(this.task.taskName + '', Validators.required),
      creationDate: new FormControl(this.task.creationDate, Validators.required),
      dueDate: new FormControl(this.task.dueDate, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
      status: new FormControl(this.task.status, Validators.required),
      collectFrom: new FormControl(this.task.collectFrom, Validators.required),
      collectLocation: new FormControl(this.task.collectLocation),
      deliverTo: new FormControl(this.task.deliverTo, Validators.required),
      deliverLocation: new FormControl(this.task.deliverLocation),
      description: new FormControl(this.task.description),
    });
  }

  updateTask() {
    const taskToUpdate = this.currentTask.value;
    taskToUpdate.lastEditedBy = this.auth.userData.displayName;

    this.firebaseService.updateTask(taskToUpdate).then(() => {
      this.presentCompleteToast(taskToUpdate);
    });
  }

  // Toast
  async presentCompleteToast(task) {
    const toast = await this.toast.create({
      message: 'Task Updated Successfully',
      duration: 2000,

    });
    await toast.present();
    await toast.onWillDismiss().then(() => {
      this.dismiss();
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
