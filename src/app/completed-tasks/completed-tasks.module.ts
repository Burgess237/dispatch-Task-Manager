import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedTasksPageRoutingModule } from './completed-tasks-routing.module';

import { CompletedTasksPage } from './completed-tasks.page';
import { FilterPipe } from '../filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedTasksPageRoutingModule
  ],
  declarations: [CompletedTasksPage, FilterPipe]
})
export class CompletedTasksPageModule {}
