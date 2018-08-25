import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/index.provider';
import { ProductPage } from '../product/product';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery: string = '';
  items: string[];
  anyResults: boolean = false;
  term: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _productsProvider: ProductsProvider
  ) {
  }

  noResults() {
    return this.term.length > 0;
  }

  searchProduct(ev: any) {
    const val = ev.target.value;

    if ( val ) {
      this._productsProvider.searchProduct(val).subscribe(
        ( res: any ) => {
          this.items = res.data;
          if (this.items.length === 0) {
            this.anyResults = true;
            this.term = val;
          } else {
            this.term = '';
          }
        }
      );
    } else {
      this.items = [];
      this.term = '';
    }

  }

  goToProduct(product: any) {
    this.navCtrl.push(ProductPage, { product })
  }

}
