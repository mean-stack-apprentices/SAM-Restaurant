import { loginUser } from './../../store/actions/user/user.actions';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  signInForm: FormGroup
  constructor(
    private userService: UserService,
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    })
   }

  ngOnInit(): void {
  }

  signIn() {
    console.log(this.signInForm.value)
   this.store.dispatch(loginUser({data: this.signInForm.value}))
    this.signInForm.reset();
  }

}
