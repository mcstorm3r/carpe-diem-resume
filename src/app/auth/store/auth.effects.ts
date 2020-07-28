import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { of } from 'rxjs';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient) {}

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authState: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: authState.payload.email,
                password: authState.payload.password,
                returnSecureToken: true
            }).pipe(tap(responseData => {
                // Set logout timer
            }),
            map(responseData => {
                return this.handleAuthentication(responseData);
            }), catchError(error => {
                return this.handleError(error);
            }));
        })
    );

    private handleAuthentication = (responseData: AuthResponseData) => {
        return of();
    }

    private handleError = (error) => {
        return of();
    }

}
