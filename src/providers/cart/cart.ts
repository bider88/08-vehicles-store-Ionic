import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CartProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }

}
