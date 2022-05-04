import { Action, createReducer, on } from '@ngrx/store';
import { MenuItems } from '../../../../../../shared/models/menuItems.model';
import { AddToCart, createMenuItemsSuccess, loadMenuItemsSuccess, selectMenuItemsAction} from '../../actions/menu-item/menu-item.actions';


export const menuItemFeatureKey = 'menuItem';

export interface State {
  selectedMenuItems: MenuItems[]
  cart: MenuItems[]
  menuItems:MenuItems[]
  selectedMenuItem:MenuItems[]
}

export const initialState: State = {
  selectedMenuItems: [],
  cart:[],
  menuItems:[],
  selectedMenuItem: [],
};


export const reducer = createReducer(
  initialState,
  on(loadMenuItemsSuccess, (state, action) => {
    return {...state, menuItems: action.data}
  }),
  on(createMenuItemsSuccess, (state, action) => {
    const products = [...state.menuItems];
    products.push(action.data);
    return {...state, products}
  }),
  on(selectMenuItemsAction, (state, action) => {
    const selectedProduct = [...state.selectedMenuItem];
    selectedProduct.push(action.data)
    return { ...state, selectedProduct };
  }),
  on(AddToCart, (state, action) => {
    const cart = [...state.cart];
  cart.push(action.data)
    return { ...state, cart};
  }),
);

