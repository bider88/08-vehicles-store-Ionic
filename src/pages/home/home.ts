import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/index.provider';
import { Product } from '../../models/product.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Product[] = [];
  notFinished: boolean = true;

  constructor(
    public navCtrl: NavController,
    private _productProvider: ProductsProvider
  ) {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productProvider.loadAllProducts().subscribe(
      (products: any) => {

        const newData = this.group( products.data, 2 );

        this.products.push(...newData);
        console.log(this.products);
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

  private group( arr: any, size: number ) {

    let newArray = [];

    for(let i = 0; i < arr.length; i+= size) {
      newArray.push( arr.slice(i, i+size ) );
    }

    console.log( 'new Array' );
    return newArray;
  }

}
