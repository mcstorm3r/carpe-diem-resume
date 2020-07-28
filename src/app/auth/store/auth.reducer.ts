import { User } from '../../shared/user.model';
import { AuthActions, LOGIN_START, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL, SIGNUP_START, AUTO_LOGIN, LOGOUT } from './auth.actions';

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


export function authReducer(state: State = initialState, action: AuthActions): State {
    switch (action.type) {
        case LOGIN_START:
        case SIGNUP_START:
        return {
            ...state,
            authError: null,
            loading: true
        };
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
            };
        case AUTHENTICATION_FAIL:
            return {
                ...state,
            };
        case AUTO_LOGIN:
            return {
                ...state
            };
        case LOGOUT:
            return {
                ...state
            };
        }
}
