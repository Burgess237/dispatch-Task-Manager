import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  constructor(public firebaseService: FirebaseService, public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.task);
    this.currentTask = new FormGroup({
      taskName: new FormControl(this.task.taskName + '', Validators.required),
      creationDate: new FormControl(this.task.creationDate, Validators.required),
      dueDate: new FormControl(this.task.dueDate, Validators.required),
      extraInfo: new FormControl(this.task.extraInfo),
      priority: new FormControl(this.task.priority, Validators.required),
      status: new FormControl(this.task.status, Validators.required),
      id: new FormControl(this.task.id)
    });
  }

  updateTask() {
    this.firebaseService.updateTask(this.currentTask.value).then(res => {
      console.log(res);
      this.dismiss();
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }


}
