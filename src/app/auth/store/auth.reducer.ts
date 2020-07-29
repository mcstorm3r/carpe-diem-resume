import { User } from '../../shared/user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: '',
    loading: false
};


export function authReducer(state: State = initialState, action: AuthActions.AuthActions): State {
    switch (action.type) {
        case AuthActions.LOGIN_START:
        case  AuthActions.SIGNUP_START:
        return {
            ...state,
            authError: null,
            loading: true
        };
        case  AuthActions.AUTHENTICATION_SUCCESS:
            const newUser = new User(
                action.payload.email,
                action.payload.localId,
                action.payload.idToken,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: newUser,
                authError: null,
                loading: false
            };
        case  AuthActions.AUTHENTICATION_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false
            };
        case  AuthActions.AUTO_LOGIN:
            return {
                ...state
            };
        case  AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        }
}
