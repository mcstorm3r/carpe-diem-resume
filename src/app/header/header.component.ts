import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = false;
  isAuthenticated = false;
  subscription: Subscription;
  authMode = ['Login', 'Logout'];

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth').pipe(map(authState => authState.user))
    .subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.router.navigate(['/resumes']);
      }
    });
  }

  logout() {
    if (this.isAuthenticated) {
      this.store.dispatch(new AuthActions.Logout());
      this.isAuthenticated = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
