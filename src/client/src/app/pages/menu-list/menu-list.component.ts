import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { MenuItems } from '../../../../../shared/models/menuItems.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  menuItems$!: Observable<MenuItems[]>;
  menuItems: MenuItems[] = [];

  constructor(
    public router: ActivatedRoute,
    private routers: Router,
    public menuItemService: MenuItemsService,
    private cartService:CartService
  ) {
    this.router.paramMap.subscribe((route) => {
      console.log(route);
      this.menuItemService
        .getMenuItems(route.get('category'))
        .pipe(tap((data) => (this.menuItems = data)))
        .subscribe((data) => console.log(data));
    });
  }

  ngOnInit(): void {}

addToCart(item:MenuItems) {
  this.cartService.addToCart(item)
}
}





