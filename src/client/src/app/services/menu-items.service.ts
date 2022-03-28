import { MenuItems } from './../../../../shared/models/menuItems.model.js';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  constructor(private api: ApiService) { }
  getMenuItems() {
    this.api.get<{ data: MenuItems[] }>('menu-Items').pipe(map((res) => res.data));
  }

}
