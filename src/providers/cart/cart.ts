import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform } from 'ionic-angular';
import { Product } from '../../models/product.model';

import { Storage } from '@ionic/storage';

@Injectable()
export class CartProvider {

  items: Product[] = [];

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private platform: Platform
  ) {
    this.loadStorage();
  }

  addToCart(item: Product) {
    for( let article of this.items ) {
      if ( item.codigo === article.codigo ) {
        this.showAlert('¡Producto ya existe!', `El ${item.producto} ya se encuantra en el carrito.`);
        return;
      }
    }

    this.items.push(item);
    this.saveStorage();
    this.showToast(`Se ha agregado ${item.producto}.`, 2000);
  }

  showAlert(title: string = 'Aviso', subTitle: string = '') {
    this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['OK']
    }).present();
  }

  showToast(message: string = 'Aviso', duration: number = 3000) {
    this.toastCtrl.create({
      message,
      duration
    }).present();
  }

  loadStorage() {
    return new Promise( (resolve, reject) => {
      if ( this.platform.is('cordova') ) {

        this.storage.get('items').then((val) => {

          if ( val ) {
            this.items = val;
          }
          resolve();
        });

      } else {

        if ( localStorage.getItem('items') ) {
          this.items = JSON.parse(localStorage.getItem('items'));
        }

        resolve();
      }
    })
  }

  private saveStorage() {
    if ( this.platform.is('cordova') ) {
      this.storage.set('items', this.items);
    } else {
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

}
