import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/url.services';

@Injectable()
export class ProductsProvider {

  page: number = 1;
  pageCategory: number = 1;
  categories: Array<any>;

  constructor(public http: HttpClient) {
    this.getCategories();
   }

  loadAllProducts() {
    const url = `${URL_SERVICES}/products/all/${this.page}`;

    this.page++;

    return this.http.get(url);
  }

  getCategories() {
    const url = `${URL_SERVICES}/lines`;

    return this.http.get(url).subscribe(
      ( categories: any ) => this.categories = categories.data
    );
  }

  getByCategories(id: number) {
    const url = `${URL_SERVICES}/products/by_type/${id}/${this.pageCategory}`;

    this.pageCategory++;

    return this.http.get(url);
  }

}
