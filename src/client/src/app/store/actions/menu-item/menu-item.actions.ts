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




