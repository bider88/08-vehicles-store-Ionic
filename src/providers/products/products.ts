import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProductsProvider Provider');
  }

}
