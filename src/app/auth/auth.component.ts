import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { LoginStart, SignupStart } from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscription: Subscription;
  loading = false;
  authError: string;

  constructor(private store: Store<fromApp.AppState>) { }

  private initForm(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [Validators.minLength(6), Validators.required])
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.store.select('auth')
    .subscribe(authState => {
        this.loading = authState.loading;
        this.authError = authState.authError;
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(new LoginStart({email, password}));
    this.loginForm.reset();
  }

  onSignup() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(new SignupStart({email, password}));
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
