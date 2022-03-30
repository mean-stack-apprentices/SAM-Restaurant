import { ApiService } from './api.service';
import { Ingredients } from './../../../../shared/models/ingredients.model.js';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private api:ApiService) { }
  getIngredients() {
    return this.api.get<{ data: Ingredients[] }>('ingredients').pipe(map((res) => res.data));
  }
}
