import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform, ModalController } from 'ionic-angular';
import { Product } from '../../models/product.model';

import { UserProvider } from '../user/user';
// Plugins
import { Storage } from '@ionic/storage';
import { CartPage } from '../../pages/cart/cart';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class CartProvider {

  items: Product[] = [];
  amount: number = 0;

  constructor(
    public http: HttpClient,
    private _userProvider: UserProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private platform: Platform
  ) {
    this.loadStorage();
    this.updateAmount();
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
    this.updateAmount();
    this.showToast(`Se ha agregado ${item.producto}.`, 2000);
  }

  updateAmount() {
    this.amount = 0;

    for ( let item  of this.items ) {
      this.amount += Number( item.precio_compra );
    }
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

}
