import { Injectable } from '@angular/core';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore, private auth: AuthService) { }



  getTasks() {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  createTask(task: Task) {
    return this.firestore.collection('tasks').add(task);
  }

  updateTask(task: Task) {
    return this.firestore.doc('tasks/' + task.id).update(task);
  }

  deleteTask(task) {
    return this.firestore.doc('tasks/' + task.id).delete();
  }

  tasksInDueDateOrder() {
    return this.firestore.collection('tasks', ref => ref.orderBy('dueDate')).snapshotChanges();
  }

  completedTasks() {
    return this.firestore.collection('tasks', ref => ref
    .where('status', '==', 'complete')
    .where('archived', '==', false)).snapshotChanges();
  }

  archivedTasks() {
    return this.firestore.collection('tasks', ref => ref.where('archived', '==', true)).snapshotChanges();
  }

  setUserLocation(user) {
    return this.firestore.doc('users/' + user.uid).update(user);
  }

  getUserLocation(user) {
    return this.firestore.doc('users/'+ user.uid).snapshotChanges();
  }

  getUsersForMap() {
    return this.firestore.collection('users').snapshotChanges();
  }

}
