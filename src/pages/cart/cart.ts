import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
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
    private loadingCtrl: LoadingController,
    private _cartProvider: CartProvider
  ) {
    this.getItems();
  }

  getItems() {
    this.items = this._cartProvider.items;
  }

  deleteItem(item: Product, index: number) {
    this._cartProvider.removeItem(index);
    this.toatCtrl.create({
      message: 'Se ha eliminado ' + item.producto,
      duration: 2500,
      position: 'top'
    }).present();
  }

  buy() {
    const loading = this.loadingCtrl.create({
      content: 'Realizando compra...'
    });
    loading.present();
    this._cartProvider.generateOrder(loading, this.viewCtrl);
  }

  getAmount() {
    return this._cartProvider.amount;
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
