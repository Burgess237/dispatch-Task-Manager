import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {

  @Input() task: Task;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({ dismissed: true });
  }

}
