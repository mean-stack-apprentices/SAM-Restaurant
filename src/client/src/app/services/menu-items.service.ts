import { MenuItems } from './../../../../shared/models/menuItems.model.js';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Ingredients } from '../../../../shared/models/ingredients.model.js';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {
  MenuItems: MenuItems[] = [];
  menuItem: MenuItems | null = null;
  constructor(private api: ApiService) {}
  getMenuItems(category: string | null) {
    return this.api
      .get<{ data: MenuItems[] }>('menu-Items/' + category)
      .pipe(map((res) => (this.MenuItems = res.data)));
  }
  selectedMenuItem(menuId: string | null) {
    return this.api.get<{ data: MenuItems }>(menuId + '/ingredients').pipe(
      tap((data) => console.log(data)),
      map((res) => (this.menuItem = res.data))
    );
  }

  get menuItems() {
    return this.MenuItems;
  }
}
