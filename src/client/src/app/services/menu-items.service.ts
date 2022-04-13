import { MenuItems } from './../../../../shared/models/menuItems.model.js';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
MenuItems:MenuItems[]=[]
  constructor(private api: ApiService,

    ) { }
  getMenuItems(category:string | null) {
    return this.api.get<{ data: MenuItems[] }>('menu-Items/' + category).pipe(map((res) => this.MenuItems = res.data));
  }
get menuItems(){
  return this.MenuItems;
}

}
