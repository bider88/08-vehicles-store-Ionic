import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { OrdersDetailPage } from '../orders-detail/orders-detail';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cartProvider: CartProvider,
    private _userProvider: UserProvider
  ) {
  }

  ionViewWillEnter(){
    if ( this._userProvider.isLoggedIn() ) {
      this.getOrders();
    } else {
      this.orders = [];
    }
  }

  getOrders() {
    this._cartProvider.getOrders().subscribe(
      ( res: any ) => {
        this.orders = res.data;
      }
    );
  }

  goToDetailOrder(order: any) {
    this.navCtrl.push(OrdersDetailPage, { order })
  }

}
