import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {

  @Input() user: User;

  constructor(public modalController: ModalController, public angularFirestore: AngularFirestore) { }

  ngOnInit() {}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  createTask(name, date, priority ) {
    console.log(name, date, priority);
    const task = {
      taskName: name,
      taskDate: date,
      taskPriority: priority
    };
    this.angularFirestore.collection('/tasks').add(task).then(res => {
      console.log(res);
      this.dismiss();
    }
    );
  }

}

export interface User {
  name: string;
  id: number;
}
