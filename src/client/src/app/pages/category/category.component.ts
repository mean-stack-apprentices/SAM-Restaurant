import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category$: Observable<Category[]>
  constructor(
    private categoryService: CategoryService
  ) {
    this.category$ = this.categoryService.getCategories()
  }

  ngOnInit(): void {
  }

}
