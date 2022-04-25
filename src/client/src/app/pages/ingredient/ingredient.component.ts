import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { Ingredients } from '../../../../../shared/models/ingredients.model';
import { MenuItems } from '../../../../../shared/models/menuItems.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
  menuItems: MenuItems | null = null;
  constructor(
    public menuItemService: MenuItemsService,
    public router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe((route) => {
      console.log(route.get('category'));

      this.menuItemService
        .selectedMenuItem(route.get('menuid'))
        .pipe(tap((data) => (this.menuItems = data)))
        .subscribe((data) => console.log(data));
    });
  }

  ngOnInit(): void {}
}
