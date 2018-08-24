import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Plugins
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartProvider } from '../providers/cart/cart';
import { ProductsProvider } from '../providers/products/products';
import { UserProvider } from '../providers/user/user';
import { ImagePipe } from '../pipes/image/image';
import { ProductPage } from '../pages/product/product';
import { CartPage } from '../pages/cart/cart';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoriesPage } from '../pages/categories/categories';
import { OrdersPage } from '../pages/orders/orders';
import { OrdersDetailPage } from '../pages/orders-detail/orders-detail';
import { LoginPage } from '../pages/login/login';
import { ByCategoryPage } from '../pages/by-category/by-category';

@NgModule({
  declarations: [
    ImagePipe,
    MyApp,
    HomePage,
    ProductPage,
    CartPage,
    TabsPage,
    CategoriesPage,
    ByCategoryPage,
    OrdersPage,
    OrdersDetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    CartPage,
    TabsPage,
    CategoriesPage,
    ByCategoryPage,
    OrdersPage,
    OrdersDetailPage,
    LoginPage
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
