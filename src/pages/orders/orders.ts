import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { OrdersDetailPage } from '../orders-detail/orders-detail';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: any[] = [];
  subs: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cartProvider: CartProvider
  ) {
  }

  ionViewWillEnter(){
    this.getOrders();
  }

  ionViewDidLeave() {
    this.orders = [];
    this.subs.unsubscribe();
  }

  getOrders() {
    this.subs = this._cartProvider.getOrders().subscribe(
      ( res: any ) => {
        this.orders = res.data;
      }
    );
  }

  goToDetailOrder(order: any) {
    this.navCtrl.push(OrdersDetailPage, { order })
  }

}
