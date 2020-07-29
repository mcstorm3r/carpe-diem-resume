import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAIL = '[Auth] Authentication Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';


export class AuthenticationSuccess implements Action {
    readonly type = AUTHENTICATION_SUCCESS;

    constructor(public payload: {
        email: string,
        idToken: string,
        expirationDate: Date,
        localId: string;
    }) {}
}

export class AuthenticationFail implements Action {
    readonly type = AUTHENTICATION_FAIL;

    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {
        email: string,
        password: string
    }){}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {
        email: string,
        password: string
    }) {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}


export type AuthActions =
  LoginStart
| AuthenticationSuccess
| AuthenticationFail
| SignupStart
| AutoLogin
| Logout;

