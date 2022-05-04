import { Action, createReducer, on } from '@ngrx/store';
import { MenuItems } from '../../../../../../shared/models/menuItems.model';
import { loadMenuItemsSuccess} from '../../actions/menu-item/menu-item.actions';


export const menuItemFeatureKey = 'menuItem';

export interface State {
  selectedMenuItems: MenuItems[]
  cart: MenuItems[]
}

export const initialState: State = {
  selectedMenuItems: [],
  cart:[]
};


export const reducer = createReducer(
  initialState,
  on(loadMenuItemsSuccess, (state, action) => {
    return {...state, menuItems: action.data}
  })


);

