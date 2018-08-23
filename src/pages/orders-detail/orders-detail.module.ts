import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersDetailPage } from './orders-detail';

@NgModule({
  declarations: [
    OrdersDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersDetailPage),
  ],
})
export class OrdersDetailPageModule {}
