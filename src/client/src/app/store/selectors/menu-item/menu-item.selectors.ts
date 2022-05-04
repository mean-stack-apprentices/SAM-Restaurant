import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './../../index';
import * as fromMenuItem from '../../reducers/menu-item/menu-item.reducer'

const menuItemdFeatureSelector = createFeatureSelector<AppState, fromMenuItem.State>(fromMenuItem.menuItemFeatureKey)


export const menuItemsSelector = createSelector(
  menuItemdFeatureSelector ,
  (state) => state.menuItems
);
export const selectedMenuItemSelector = createSelector(
  menuItemdFeatureSelector ,
  (state) => state.selectedMenuItem
)
export const addToCartSelector = createSelector(
  menuItemdFeatureSelector ,
  (state) => state.cart
)
export const cartSelector = createSelector(
  menuItemdFeatureSelector ,
  (state) => state.cart
)
