import { loggedInUserSelector } from './../../store/selectors/user/user.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedInUser$!: Observable<User | null>;
  constructor(private store: Store<AppState>) {
    this.loggedInUser$ = this.store.select(loggedInUserSelector)
    console.log(this.loggedInUser$)
   }

  ngOnInit(): void {
  }

}
