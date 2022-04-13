import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../shared/models/category.model';

// import { MatMenuTrigger } from '@angular/material/menu/matMenu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  category$: Observable<Category[]>;
  isOpen = false;
  constructor(public router: Router, private categoryService: CategoryService) {
    this.category$ = this.categoryService.getCategories();
  }

  ngOnInit(): void {}
  menu() {
    this.router.navigate(['menu']);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}
