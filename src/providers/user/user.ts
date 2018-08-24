import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/url.services';

// Plugins
import { Storage } from '@ionic/storage';

import { map } from 'rxjs/operators/map'
import { AlertController, Platform } from 'ionic-angular';
@Injectable()
export class UserProvider {

  id_user: string;
  token: string;

  constructor(
    public http: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.loadStorage();
  }

  login(email: string, password: string) {
    const url = `${URL_SERVICES}/login`;

    return this.http.post(url, { email, password }).pipe(
      map( ( res: any ) => {
        if ( !res.ok ) {

          this.alertCtrl.create({
            title: 'Error al iniciar sesión',
            subTitle: 'Email y/o contraseña incorrectas',
            buttons: ['OK']
          }).present();

        } else {

          this.token = res.token;
          this.id_user = res.data.id;

          this.saveStorage();

        }
      })
    );
  }

  logout() {
    this.token = null;
    this.id_user = null;
    this.saveStorage();
  }

  isLoggedIn() {
    return this.token;
  }

  loadStorage() {
    if ( this.platform.is('cordova') ) {

      this.storage.get('token').then((val) => {

        if ( val ) {
          this.token = val;
        }
      });

      this.storage.get('id_user').then((val) => {

        if ( val ) {
          this.id_user = val;
        }
      });

    } else {

      if ( localStorage.getItem('token') &&  localStorage.getItem('id_user') ) {
        this.token = localStorage.getItem('token');
        this.id_user = localStorage.getItem('id_user');
      }

    }
  }

  private saveStorage() {
    if ( this.platform.is('cordova') ) {
      this.storage.set('token', this.token);
      this.storage.set('id_user', this.id_user);
    } else {
      if ( this.token ) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id_user', this.id_user);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id_user');
      }
    }
  }


}
