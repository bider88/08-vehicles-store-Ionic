import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/url.services';

@Injectable()
export class ProductsProvider {

  page: number = 1;

  constructor(public http: HttpClient) { }

  loadAllProducts() {
    const url = `${URL_SERVICES}/products/all/${this.page}`;

    this.page++;

    return this.http.get(url);
  }

}
