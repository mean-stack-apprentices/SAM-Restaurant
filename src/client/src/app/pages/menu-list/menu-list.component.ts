import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { Category } from '../../../../../shared/models/category.model';
import { MenuItems } from '../../../../../shared/models/menuItems.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  menuItems$!:Observable< MenuItems[]>;
menuItems:MenuItems[]= [];
category$: Observable<Category[]>


  constructor
  (public router: ActivatedRoute,
  public menuItemService: MenuItemsService,
  private categoryService: CategoryService
    ) {
      this.category$ = this.categoryService.getCategories();
     this.router.paramMap.subscribe(route => {
      console.log(route.get('category'));
  this.menuItemService.getMenuItems(route.get('category')).pipe(tap(data => this.menuItems = data)).subscribe(data => console.log(data))
    });

     }

  ngOnInit(): void {
  }




}
