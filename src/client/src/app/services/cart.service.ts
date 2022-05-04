import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {Cart } from '../../../../shared/models/cart.model'
import { map, tap } from 'rxjs/operators';
import { MenuItems } from '../../../../shared/models/menuItems.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
cart:MenuItems[]=[]
  constructor(private api:ApiService) { }

  getCart() {
    return this.api.get<{ data: Cart }>('cart').pipe(map((res) => res.data));
  }

  addToCart(menuitem: MenuItems) {
    this.cart.push(menuitem)
//  console.log(this.cart)
    return this.cart
  }
  deleteItemFromCart(product: MenuItems) {
    console.log('delete cart from cart', product)
    return this.api.delete<Cart>('delete-from-cart/' +  product._id)
  }

  deleteProductFromCart(c:MenuItems) {
    console.log(this.cart)
 this.cart = this.cart.filter((item) => item._id != c._id)
 return this.cart
}


}
