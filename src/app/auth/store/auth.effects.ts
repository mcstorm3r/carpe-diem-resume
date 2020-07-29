import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { of } from 'rxjs';
import { User } from '../../shared/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authState: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: authState.payload.email,
                password: authState.payload.password,
                returnSecureToken: true
            }).pipe(tap(responseData => {
                console.log(responseData);
                // Set logout timer
            }),
            map(responseData => {
                return this.handleAuthentication(responseData);
            }), catchError(error => {
                return this.handleError(error);
            }));
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authState: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: authState.payload.email,
                    password: authState.payload.password,
                    returnSecureToken: true
                }).pipe(tap(responseData => {
                    console.log(responseData);
                    // Set logout timer
                }),
                map(responseData => {
                    return this.handleAuthentication(responseData);
                }), catchError(error => {
                    return this.handleError(error);
                }));
        })
    );

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                userId: string,
                _token: string,
                _tokenExpirationDate: Date
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return {type: 'DUMMY'};
            }
            const expirationTime = new Date(userData._tokenExpirationDate);

            const localUser = new User(
                userData.email,
                userData.userId,
                userData._token,
                expirationTime
            );
            if (localUser.token) {
                this.router.navigate(['/resumes']);
                return new AuthActions.AuthenticationSuccess({
                    email: localUser.email,
                    localId: localUser.userId,
                    idToken: localUser._token,
                    expirationDate: expirationTime
                });
            }
            return {type: 'DUMMY'};
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        map(() => {
            this.router.navigate(['/auth']);
            localStorage.removeItem('userData');
            return new AuthActions.Logout();
        })
    );

    private handleAuthentication = (responseData: AuthResponseData) => {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);

        const user = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            expirationDate
        );

        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.AuthenticationSuccess({
            email: responseData.email,
            idToken: responseData.idToken,
            expirationDate,
            localId: responseData.localId
        });
    }

    private handleError = (error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error!';
        console.log(error);

        if (!error.error || error.error.error) {
            return of(new AuthActions.AuthenticationFail(errorMessage));
        }

        switch (error.error.error.message) {
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The user data is invalid';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user has been disabled by the administator';
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'This email address is already in use by another account.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        }
        console.log(errorMessage);
        return of(new AuthActions.AuthenticationFail(errorMessage));
    }

}
