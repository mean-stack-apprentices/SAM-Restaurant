import { Action, createReducer, on } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { MenuItems } from '../../../../../../shared/models/menuItems.model';
import { deleteFromCartSuccess, loadCartsSuccess} from '../../actions/cart/cart.actions';
import { loadMenuItemsSuccess } from '../../actions/menu-item/menu-item.actions';


export const cartFeatureKey = 'cart';

export interface State {
  cart:Cart | null;
}

export const initialState: State = {
  cart: null,
};


export const reducer = createReducer(
  initialState,
  on(loadCartsSuccess, (state, action) => {
    return { ...state, cart: action.data };
  }),
  on(deleteFromCartSuccess, (state, action) => {
    return {
      ...state, cart: action.data
    };
  }),


);

