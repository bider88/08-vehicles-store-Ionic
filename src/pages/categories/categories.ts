import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/index.provider';
import { ByCategoryPage } from '../by-category/by-category';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _productProvider: ProductsProvider
  ) {
    this.getCategories();
  }

  getCategories() {
    this.categories = this._productProvider.categories;
  }

  byCategory(category: any) {
    this.navCtrl.push(ByCategoryPage, { category });
  }

}
