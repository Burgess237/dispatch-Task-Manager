import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, fromCollectionRef } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Task } from 'src/app/task';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { catchError, takeUntil } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  createdTask: FormGroup;
  date = new Date();
  currentDate: string;
  destroy$: Subject<null> = new Subject();
  fileToUpload: File;
  filePreview: string | ArrayBuffer;
  usersList: any[];
  uploadProgress;
  submitted = false;
  selectedFileBLOB;
  fileURL;
  fileName;

  constructor(
    public modalController: ModalController,
    public firebaseService: FirebaseService,
    public auth: AuthService,
    public fileChooser: FileChooser,
    public toastController: ToastController,
    private sanitizer: DomSanitizer) {
    this.currentDate = this.date.toISOString();
   }


  ngOnInit() {
    this.createdTask = new FormGroup({
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
      accountManager: new FormControl('', Validators.required),
      file: new FormControl('')
    });

    this.firebaseService.getUsers().subscribe((res: any) => {
      console.log(res);
      if(res) {
        this.usersList = res.map(e => {
          const data = e.payload.doc.data();
          const id = e.payload.doc.id;
          data.id = id;
          return {id, ...data};
        });
    }});

   /*this.createdTask
    .get('file')
    .valueChanges.pipe(takeUntil(this.destroy$))
    .subscribe((newValue) => {
      this.handleFileChange(newValue.files);
    });*/
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
    createdTaskObject.creationDate = this.currentDate;
    if(this.fileURL) {
      createdTaskObject.file = this.fileURL;
      createdTaskObject.fileName = this.fileName;
    }
    this.firebaseService.createTask(createdTaskObject).then(res=> {
      this.dismiss();
    });
  }

  handleFileChange(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileToUpload = fileInput.target.files[0];
      this.fileName = fileInput.target.files[0].name;
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create a Blog object for selected file & define MIME type
        const blob = new Blob(fileInput.target.files, { type: fileInput.target.files[0].type });
        // Create Blog URL
        const url = window.URL.createObjectURL(blob);
        this.selectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);
        if (
          fileInput.target.files[0].type === 'image/png' ||
          fileInput.target.files[0].type === 'image/gif' ||
          fileInput.target.files[0].type === 'image/jpeg'
        ) {
          console.log(e.target.result);
        } else {
          console.log(this.selectedFileBLOB);
        }

      };
      reader.readAsDataURL(fileInput.target.files[0]);
      this.postFile();
    }

  }

  postFile() {
    const mediaFolderPath = `/media`;
    const { downloadUrl$, uploadProgress$ } = this.firebaseService.uploadFileAndGetMetadata(
      mediaFolderPath,
      this.fileToUpload
    );
    this.uploadProgress = uploadProgress$;
    downloadUrl$
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            this.presentToast(error);
            return EMPTY;
          }),
        )
        .subscribe((downloadUrl) => {
          this.presentToast('File Uploaded');
          this.fileURL = downloadUrl;
        });
  }

  async presentToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

}
