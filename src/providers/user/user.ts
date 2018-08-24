import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  id_user: string;
  token: string;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }



}
