import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CategoriesPage } from '../categories/categories';
import { OrdersPage } from '../orders/orders';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabs = [
    {
      icon: 'home',
      title: 'Inicio',
      page: HomePage
    },
    {
      icon: 'star',
      title: 'Categorías',
      page: CategoriesPage
    },
    {
      icon: 'list',
      title: 'Ordenes',
      page: OrdersPage
    }
  ]
}
