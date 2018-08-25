import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { ProductsProvider, CartProvider, UserProvider } from '../../providers/index.provider';
import { Product } from '../../models/product.model';
import { ProductPage } from '../product/product';
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: Product[] = [];
  notFinished: boolean = true;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private _productProvider: ProductsProvider,
    private _cartProvider: CartProvider,
    private _userProvider: UserProvider
  ) {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productProvider.loadAllProducts().subscribe(
      (products: any) => {

        const newData = this.group( products.data, 2 );

        this.products.push(...newData);
      }
    )
  }

  doInfinite(infiniteScroll) {

    this._productProvider.loadAllProducts().subscribe(
      (products: any) => {

        if (products.data.length > 0) {

          const newData = this.group( products.data, 2 );

          this.products.push(...newData);

          infiniteScroll.complete();
        } else {
          this.notFinished = false;
          infiniteScroll.complete();
        }
      }
    );

  }

  totalItemsToCart(): number {
    return this._cartProvider.items.length;
  }

  detailProduct(product: Product) {
    this.navCtrl.push(ProductPage, { product });
  }

  showCart() {

    let modal: any;

    if ( this._userProvider.token ) {
      modal = this.modalCtrl.create( CartPage );
    } else {
      modal = this.modalCtrl.create( LoginPage );
    }

    modal.onDidDismiss( showCart => {
      if ( showCart ) {
        this.modalCtrl.create( CartPage ).present();
      }
    });

    modal.present();
  }

  login() {
    let modal = this.modalCtrl.create(LoginPage);

    modal.onDidDismiss( showCart => {
      if ( showCart ) {
        this.modalCtrl.create( CartPage ).present();
      }
    });

    modal.present();
  }

  logout() {

    this.alertCtrl.create({
      title: 'Cerrando sesión...',
      message: '¿Estás seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this._userProvider.logout();
          }
        }
      ]
    }).present();
    // this._userProvider.logout();
  }

  isLoggedIn() {
    return this._userProvider.isLoggedIn();
  }

  private group( arr: any, size: number ) {

    let newArray = [];

    for(let i = 0; i < arr.length; i+= size) {
      newArray.push( arr.slice(i, i+size ) );
    }

    return newArray;
  }

}
