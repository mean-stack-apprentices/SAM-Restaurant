import { createAction, props } from '@ngrx/store';
import { MenuItems } from '../../../../../../shared/models/menuItems.model';

export const loadMenuItems = createAction(
  '[MenuItem] Load MenuItems'
);

export const loadMenuItemsSuccess = createAction(
  '[MenuItem] Load MenuItems Success',
  props<{ data: MenuItems[]}>()
);

export const loadMenuItemsFailure = createAction(
  '[MenuItem] Load MenuItems Failure',
  props<{ error: Error }>()
);
export const createMenuItems = createAction(
  '[MenuItem] Create MenuItems',
  props<{data: MenuItems}>()
);

export const createMenuItemsSuccess = createAction(
  '[MenuItem] Create MenuItems Success',
  props<{ data: MenuItems }>()
);

export const createMenuItemsFailure = createAction(
  '[MenuItem] Create MenuItems Failure',
  props<{ error: Error }>()
);

export const AddToCart = createAction(
  '[MenuItem] Add MenuItem to Cart',
  props<{ data: MenuItems}>()
);
export const updateCartSuccess = createAction(
  '[MenuItem] Update Cart Success',
  props<{ data: MenuItems}>()
);
export const selectMenuItemsAction = createAction(
  '[MenuItem] Select MenuItem',
  props<{ data: MenuItems}>()
);


