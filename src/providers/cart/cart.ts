import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Product } from '../../models/product.model';

@Injectable()
export class CartProvider {

  items: Product[] = [];

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    console.log('Hello CartProvider Provider');
  }

  addToCart(item: Product) {
    for( let article of this.items ) {
      if ( item.codigo === article.codigo ) {
        this.showAlert('¡Producto ya existe!', `El ${item.producto} ya se encuantra en el carrito.`);
        return;
      }
    }

    this.items.push(item);
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

}
