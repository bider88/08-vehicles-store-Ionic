import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartProvider } from '../providers/cart/cart';
import { ProductsProvider } from '../providers/products/products';
import { UserProvider } from '../providers/user/user';
import { ImagePipe } from '../pipes/image/image';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider,
    ProductsProvider,
    UserProvider
  ]
})
export class AppModule {}
