import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { logoutUser } from 'src/app/store/actions/user/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() public loggedInUser: User | null = null;
  constructor(private store: Store<AppState>, private route: Router) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.store.dispatch(logoutUser())
    this.route.navigate([''])

  }
}
