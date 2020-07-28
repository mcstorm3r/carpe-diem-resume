import { User } from '../../shared/user.model';
import { AuthActions, LOGIN_START } from './auth.actions';

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


export function authReducer(state: State = initialState, action: AuthActions) {
    switch (action.type) {
        case LOGIN_START:
        return {
            ...state,
            authError: null,
            loading: true
        };
    }
}
