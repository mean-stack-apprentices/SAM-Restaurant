import { createAction, props } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { MenuItems } from '../../../../../../shared/models/menuItems.model';

export const loadCarts = createAction(
  '[Cart] Load Carts'
);

export const loadCartsSuccess = createAction(
  '[Cart] Load Carts Success',
  props<{ data: Cart }>()
);

export const loadCartsFailure = createAction(
  '[Cart] Load Carts Failure',
  props<{ error: Error}>()
);

export const deleteFromCart = createAction(
  '[Cart] deleteFrom Carts',
  props<{ data: MenuItems }>()
);

export const deleteFromCartSuccess = createAction(
  '[Cart] deleteFrom Carts Success',
  props<{ data: Cart }>()
);

export const deleteFromCartFailure = createAction(
  '[Cart] deleteFrom Carts Failure',
  props<{ error: Error}>()
);
