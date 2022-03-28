import { Category } from './../../../../shared/models/category.model.js';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api:ApiService) { }
  getCategories() {
    this.api.get<{ data: Category[] }>('category').pipe(map((res) => res.data));
  }
}
