import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private _userProvider: UserProvider
  ) {
  }

  login() {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando sesión'
    });
    loading.present();
    this._userProvider.login(this.email, this.password).subscribe(
      () => {
        if ( this._userProvider.isLoggedIn() ) {
          this.viewCtrl.dismiss(true);
        }
        loading.dismiss();
      }
    );
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
