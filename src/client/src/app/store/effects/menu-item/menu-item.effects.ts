import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { Category } from '../../../../../../shared/models/category.model';
import { loadMenuItems, loadMenuItemsSuccess, loadMenuItemsFailure } from '../../actions/menu-item/menu-item.actions';



@Injectable()
export class MenuItemEffects {

  // loadMenuItems$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadMenuItems),
  //     mergeMap(() =>
  //       this.MenuItemService.getMenuItems(category).pipe(
  //         map((data) => loadMenuItemsSuccess({ data })),
  //         catchError((error) => of(loadMenuItemsFailure({ error })))
  //       )
  //     )
  //   )
  // );



  constructor(private actions$: Actions, private MenuItemService:MenuItemsService) {}

}
