import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { deleteFromCart, deleteFromCartFailure, deleteFromCartSuccess, loadCarts, loadCartsFailure, loadCartsSuccess } from '../../actions/cart/cart.actions';



@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadCarts),
    mergeMap(() =>
      this.cartService.getCart().pipe(
        map((data) => loadCartsSuccess({data})),
        catchError((error) => of(loadCartsFailure({ error })))
      )
    )
  )
  );

  deleteCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteFromCart),
    mergeMap((action) =>
      this.cartService.deleteItemFromCart(action.data).pipe(
        tap(data =>
        console.log(data, "delete from effect")
      ),
        map((data) =>deleteFromCartSuccess({data})),
        catchError((error) => of(deleteFromCartFailure({ error })))
      )
    )
  )
  );

  constructor(private actions$: Actions, private cartService: CartService) {}

}
