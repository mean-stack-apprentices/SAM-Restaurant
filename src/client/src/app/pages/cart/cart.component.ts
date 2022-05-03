import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AppState } from 'src/app/store';
import { deleteFromCart, loadCarts } from 'src/app/store/actions/cart/cart.actions';
import { Cart } from '../../../../../shared/models/cart.model';
import { MenuItems } from '../../../../../shared/models/menuItems.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart: MenuItems[] =[];
  constructor(
private cartService:CartService,
private store: Store<AppState>,
private router:Router
  ) {
this.cart = this.cartService.cart
  }

  ngOnInit(): void {
    this.store.dispatch(loadCarts());
  }
deleteFromCart(item:MenuItems){
  this.cartService.deleteProductFromCart(item)
  
  console.log(this.cart)

}

// deleteFromCart(product: MenuItems) {
//   this.store.dispatch(deleteFromCart({ data: product }));
//   console.log(`product '${product._id}' deleted successfully`);
// }
}

