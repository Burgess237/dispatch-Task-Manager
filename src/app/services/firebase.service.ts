import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }



  getTasks() {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  createTask(task: Task) {
    return this.firestore.collection('tasks').add(task);
  }

  updateTask(task: Task) {
    console.log('Updating: ', task.id);
    return this.firestore.doc('tasks/' + task.id).update(task);
  }

  deleteTask(task) {
    return this.firestore.doc('tasks/' + task.id).delete();
  }
}
