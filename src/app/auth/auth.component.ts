import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { LoginStart } from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  private initForm(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.minLength(8), Validators.required])
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.store.select('auth').subscribe(authState => {
      console.log(authState);
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(new LoginStart({email, password}));
  }

  onSignup() {

  }

}
