import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  menuItems$:Observable< MenuItems[]>



  constructor
  (private router: Router,
  private menuItemService: MenuItemsService,

    ) {
     this.menuItems$= this.menuItemService.getMenuItems()

     }

  ngOnInit(): void {
  }



}
