import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, fromCollectionRef } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  createdTask: any;

  constructor(public modalController: ModalController, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.createdTask = new FormGroup({
      id: new FormControl(''),
      taskName: new FormControl('', Validators.required),
      creationDate: new FormControl('Today', Validators.required),
      dueDate: new FormControl('', Validators.required),
      extraInfo: new FormControl(''),
      priority: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  createTask() {

    this.firebaseService.createTask(this.createdTask.value).then(res=> {
      this.dismiss();
    });
  }

}

export interface User {
  name: string;
  id: number;
}
