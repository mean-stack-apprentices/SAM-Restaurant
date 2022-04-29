import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './reducers/user/user.reducer';
import * as fromMenuItem from './reducers/menu-item/menu-item.reducer';
import * as fromCart from './reducers/cart/cart.reducer';
export interface AppState {

  [fromUser.userFeatureKey]: fromUser.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromMenuItem.menuItemFeatureKey]: fromMenuItem.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromMenuItem.menuItemFeatureKey]: fromMenuItem.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
