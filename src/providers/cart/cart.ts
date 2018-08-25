import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { Product } from '../../models/product.model';

// Plugins
import { Storage } from '@ionic/storage';
import { URL_SERVICES } from '../../config/url.services';
import { UserProvider } from '../user/user';

@Injectable()
export class CartProvider {

  items: Product[] = [];
  amount: number = 0;

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private platform: Platform,
    private _userProvider: UserProvider
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

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.saveStorage();
    this.updateAmount();
  }

  generateOrder(loading: any, modal: any) {
    let codes: string[] = [];

    for ( let item of this.items ) {
      codes.push( item.codigo );
    }
    const products = {
      items: codes.join(',')
    }

    const url = `${ URL_SERVICES }/orders/generate_order/${ this._userProvider.token }/${ this._userProvider.id_user }`;

    this.http.post(url, products).subscribe(
      ( res: any ) => {
        if ( !res.ok ) {
          console.log( JSON.stringify(res.error) );
          this.showToast(res.error);
        } else {
          this.items = [];
          this.saveStorage();
          modal.dismiss();
          this.showAlert('Compra realizada', 'Su compra esta siendo atendida');
        }

        loading.dismiss();
      }
    );
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
