import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Cart } from '../../../../shared/models/cart.model'
import { map } from 'rxjs/operators';
import { MenuItems } from '../../../../shared/models/menuItems.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private api:ApiService) { }

  getCart() {
    return this.api.get<{ data: Cart }>('cart').pipe(map((res) => res.data));
  }

}
