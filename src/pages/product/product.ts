import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product: Product

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cartProvider: CartProvider
  ) {
    this.product = this.navParams.get('product');
  }

  addToCart(item: Product) {
    this._cartProvider.addToCart(item);
  }

}
