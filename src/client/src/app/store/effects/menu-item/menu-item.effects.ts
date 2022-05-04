import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { Category } from '../../../../../../shared/models/category.model';
import { loadMenuItems, loadMenuItemsSuccess, loadMenuItemsFailure, createMenuItems, createMenuItemsFailure, createMenuItemsSuccess } from '../../actions/menu-item/menu-item.actions';



@Injectable()
export class MenuItemEffects {

  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenuItems),
      mergeMap(() =>
        this.MenuItemService.getMenuitems().pipe(
          map((data) => loadMenuItemsSuccess({ data })),
          catchError((error) => of(loadMenuItemsFailure({ error })))
        )
      )
    )
  );
  createMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createMenuItems),
      mergeMap((action) =>
        this.MenuItemService.createMenuItems(action.data).pipe(
          map((data) => createMenuItemsSuccess({ data })),
          catchError((error) => of(createMenuItemsFailure({ error })))
        )
      )
    )
  );



  constructor(private actions$: Actions, private MenuItemService:MenuItemsService) {}

}
