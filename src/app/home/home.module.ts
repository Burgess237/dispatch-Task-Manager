import { ApplicationInitStatus, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HomePage } from './home.page';
import { ApplicationPipesModule } from '../application-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    ApplicationPipesModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
