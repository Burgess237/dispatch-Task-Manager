import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Task } from '../task';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
})
export class CompletedTasksPage implements OnInit {

  completedTasks: Task[] = [];

  constructor(public firestore: FirebaseService) { }

  ngOnInit() {
    this.firestore.getTasks().subscribe((res: any) => {
      if(res){
        this.completedTasks = res.map(e=> ({
            id: e.payload.doc.id,
            taskName: e.payload.doc.data().taskName,
            creationDate: e.payload.doc.data().creationDate,
            dueDate: e.payload.doc.data().dueDate,
            priority: e.payload.doc.data().priority,
            extraInfo: e.payload.doc.data().extraInfo,
            status: e.payload.doc.data().status
          }));
          this.removeComplete();
      }
    });
  }

  removeComplete() {
    this.completedTasks = this.completedTasks.filter(task => task.status === 'complete');
  }

}
