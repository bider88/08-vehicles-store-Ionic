import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { ProductsProvider } from '../../providers/index.provider';
import { ProductPage } from '../product/product';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-by-category',
  templateUrl: 'by-category.html',
})
export class ByCategoryPage {

  category: any;
  products: Product[] = [];
  notFinished: boolean = true;
  subs: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _productProvider: ProductsProvider
  ) {
    this.category = this.navParams.get('category');
    this.getProducts();
  }

  getProducts() {
    this.subs = this._productProvider.getByCategories(this.category.id).subscribe(
      (products: any) => {

        this.products.push(...products.data);
      }
    )
  }

  doInfinite(infiniteScroll) {

    this.subs = this._productProvider.getByCategories(this.category.id).subscribe(
      (products: any) => {

        if (products.data.length > 0) {

          this.products.push(...products.data);

          infiniteScroll.complete();
        } else {
          this.notFinished = false;
          infiniteScroll.complete();
        }
      }
    );

  }

  detailProduct(product: Product) {
    this.navCtrl.push(ProductPage, { product });
  }

  ionViewWillUnload(){
    this._productProvider.pageCategory = 1;
    this.products = [];
    this.subs.unsubscribe();
  }

}
