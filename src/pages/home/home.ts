import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsProvider, CartProvider } from '../../providers/index.provider';
import { Product } from '../../models/product.model';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Product[] = [];
  notFinished: boolean = true;

  constructor(
    public navCtrl: NavController,
    private _productProvider: ProductsProvider,
    private _cartProvider: CartProvider
  ) {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productProvider.loadAllProducts().subscribe(
      (products: any) => {

        const newData = this.group( products.data, 2 );

        this.products.push(...newData);
      }
    )
  }

  doInfinite(infiniteScroll) {

    this._productProvider.loadAllProducts().subscribe(
      (products: any) => {

        if (products.data.length > 0) {

          const newData = this.group( products.data, 2 );

          this.products.push(...newData);

          infiniteScroll.complete();
        } else {
          this.notFinished = false;
          infiniteScroll.complete();
        }
      }
    );

  }

  totalItemsToCart(): number {
    return this._cartProvider.items.length;
  }

  detailProduct(product: Product) {
    this.navCtrl.push(ProductPage, { product });
  }

  private group( arr: any, size: number ) {

    let newArray = [];

    for(let i = 0; i < arr.length; i+= size) {
      newArray.push( arr.slice(i, i+size ) );
    }

    return newArray;
  }

}
