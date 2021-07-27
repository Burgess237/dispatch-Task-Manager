import { Injectable } from '@angular/core';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileUpload, Task } from '../task';
import { AuthService } from './auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private firestore: AngularFirestore, private auth: AuthService, private storage: AngularFireStorage) { }

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
    return this.firestore.collection('tasks', ref => ref.orderBy('dueDate').where('status', '==', 'active')).snapshotChanges();
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

  getUsers() {
    return this.firestore.collection('users', ref => ref.orderBy('displayName')).snapshotChanges();
  }

  uploadFileAndGetMetadata(
    mediaFolderPath: string,
    fileToUpload: File,
  ): FilesUploadMetadata {
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      fileToUpload,
    );
    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(uploadTask, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string,
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL()),
    );
  }


}
