import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-orders-detail',
  templateUrl: 'orders-detail.html',
})
export class OrdersDetailPage {

  order: any;
  amount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private _cartProvider: CartProvider
  ) {
    this.order = this.navParams.get('order');
    this.getAmount();
  }

  getAmount() {
    for ( let item of this.order.detail ) {
      this.amount += Number(item.precio_compra);
    }
  }

  confirmDelete() {
    this.alertCtrl.create({
      title: 'Eliminando orden...',
      message: '¿Estás seguro de eliminar la orden?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteOrder();
          }
        }
      ]
    }).present();
  }

  private deleteOrder() {

    this._cartProvider.deleteOrder(this.order.id).subscribe(
      res => {
        this.alertCtrl.create({
          title: 'Orden eliminada',
          subTitle: 'La order se ha sido eliminada exitosamente',
          buttons: ['OK']
        }).present();
        this.navCtrl.pop();
      },
      err => console.log( JSON.stringify(err) )
    )
  }

}
