import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';



import { HomePage } from './home.page';
import { FilterPipe } from '../filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
  ],
  declarations: [HomePage, FilterPipe]
})
export class HomePageModule {}
