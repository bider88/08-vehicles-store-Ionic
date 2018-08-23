import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ByCategoryPage } from './by-category';

@NgModule({
  declarations: [
    ByCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ByCategoryPage),
  ],
})
export class ByCategoryPageModule {}
