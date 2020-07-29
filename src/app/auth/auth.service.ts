import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private store: Store<fromApp.AppState>) {}

    tokenTimerExpiration: any;

    setAutoLogoutTimer(expiresIn: number): void {
        this.tokenTimerExpiration = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expiresIn);
    }

    clearAutoLogoutTimer(): void {
        if (this.tokenTimerExpiration) {
            clearTimeout(this.tokenTimerExpiration);
            this.tokenTimerExpiration = null;
        }
    }

}
