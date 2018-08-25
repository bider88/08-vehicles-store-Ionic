import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: Product[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private toatCtrl: ToastController,
    private _cartProvider: CartProvider
  ) {
    this.getItems();
  }

  getItems() {
    this.items = this._cartProvider.items;
  }

  deleteItem(item: Product) {
    this.toatCtrl.create({
      message: 'Se ha eliminado ' + item.producto,
      duration: 2500
    }).present();
  }

  buy() {

  }

  getAmount() {
    return this._cartProvider.amount;
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
