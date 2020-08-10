import { LoggingService } from './../../shared/logging.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { of } from 'rxjs';
import { User } from '../../shared/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authState: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authState.payload.email,
            password: authState.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((responseData) => {
            this.authService.setAutoLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map((responseData) => {
            return this.handleAuthentication(responseData);
          }),
          catchError((error) => {
            return this.handleError(error);
          })
        );
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authState: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: authState.payload.email,
            password: authState.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((responseData) => {
            this.authService.setAutoLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map((responseData) => {
            return this.handleAuthentication(responseData);
          }),
          catchError((error) => {
            return this.handleError(error);
          })
        );
    })
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        userId: string;
        _token: string;
        _tokenExpirationDate: Date;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'DUMMY' };
      }
      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      const localUser = new User(
        userData.email,
        userData.userId,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (localUser.token) {
        this.authService.setAutoLogoutTimer(expirationTime);
        return new AuthActions.AuthenticationSuccess({
          email: localUser.email,
          localId: localUser.userId,
          idToken: localUser._token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false,
        });
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      this.authService.clearAutoLogoutTimer();
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    tap((authState: AuthActions.AuthenticationSuccess) => {
      if (authState.payload.redirect) {
        this.router.navigate(['/resumes']);
        this.loggingService.showSuccess('Success!');
      }
    })
  );

  @Effect({ dispatch: false })
  authFail = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_FAIL),
    tap((authState: AuthActions.AuthenticationFail) => {
      this.loggingService.showError(authState.payload);
    })
  );

  private handleAuthentication = (responseData: AuthResponseData) => {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );

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
      localId: responseData.localId,
      redirect: true,
    });
  };

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'Unknown error!';

    if (!error.error) {
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
        errorMessage =
          'This email address is already in use by another account.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
    }

    return of(new AuthActions.AuthenticationFail(errorMessage));
  };
}
