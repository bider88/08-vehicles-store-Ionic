import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/index.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Array<any[]> = [];

  constructor(
    public navCtrl: NavController,
    private _productProvider: ProductsProvider
  ) {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productProvider.loadAllProducts().subscribe(
      (products: any) => {
        this.products = products.data;
        console.log(this.products);
      }
    )
  }

}
