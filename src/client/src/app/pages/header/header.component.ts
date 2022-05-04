import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../shared/models/category.model';
import { User } from '../../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { loggedInUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { MenuItems } from '../../../../../shared/models/menuItems.model';

// import { MatMenuTrigger } from '@angular/material/menu/matMenu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart: MenuItems[] = [];
  category$: Observable<Category[]>;
  loggedInUser$!: Observable<User | null>;
  isOpen = false;

  constructor(
    public router: Router,
    private categoryService: CategoryService,
    private cartService: CartService,
    private store: Store<AppState>
  ) {
    this.category$ = this.categoryService.getCategories();
    this.cart = this.cartService.cart;
    this.loggedInUser$ = this.store.select(loggedInUserSelector);
    console.log(this.cart);
  }

  ngOnInit(): void {}
  menu() {
    this.router.navigate(['menu']);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
