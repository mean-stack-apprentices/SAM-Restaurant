import { ApiService } from './api.service';
import { Ingredients } from './../../../../shared/models/ingredients.model.js';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private api:ApiService) { }
  getIngredients(menuId:string) {
    return this.api.get<{ data: Ingredients[]}>('ingredients' + menuId).pipe(map((res) => res.data));

  }
}
