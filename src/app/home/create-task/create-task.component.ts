import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, fromCollectionRef } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  createdTask: any;
  date = new Date();
  currentDate: string;

  constructor(public modalController: ModalController, public firebaseService: FirebaseService, public auth: AuthService) {
    this.currentDate = this.date.toISOString();
   }


  ngOnInit() {
    this.createdTask = new FormGroup({
      id: new FormControl(''),
      taskName: new FormControl('', Validators.required),
      creationDate: new FormControl({value: this.currentDate, disabled: true}, Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      collectFrom: new FormControl('', Validators.required),
      collectLocation: new FormControl(''),
      deliverTo: new FormControl('', Validators.required),
      deliverLocation: new FormControl(''),
      description: new FormControl('', Validators.required),
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
    const createdTaskObject = this.createdTask.value;
    createdTaskObject.createdBy = this.auth.userData.displayName;
    createdTaskObject.lastEditedBy = this.auth.userData.displayName;
    createdTaskObject.archived = false;
    this.firebaseService.createTask(createdTaskObject).then(res=> {
      this.dismiss();
    });
  }

}
