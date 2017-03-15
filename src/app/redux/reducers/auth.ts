import { Observable } from 'rxjs/Observable';
import { ActionReducer } from '@ngrx/store';
import * as authAction from '../actions/auth';

export interface State {
    isLogging: boolean;
    loggedIn: boolean;
}
const initialState: State = {
    isLogging: false,
    loggedIn: false
};

export const reducer: ActionReducer<State> = (state = initialState, action: authAction.Actions) => {

    switch (action.type) {
        case authAction.ActionTypes.LOGIN_USER:
        case authAction.ActionTypes.REG_USER:
            return Object.assign({}, state, { isLogging: true });
        case authAction.ActionTypes.LOGOUT_SUCCESS: {
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('accessToken');
            return { isLogging: false, loggedIn: false };
        }
        case authAction.ActionTypes.LOGIN_FAILED:
        case authAction.ActionTypes.REG_FAILED: {
            return Object.assign({}, state, { isLogging: false });
        }
        case authAction.ActionTypes.LOGIN_SUCCESS: {
            const user = action.payload;
            localStorage.setItem('refreshToken', user.refreshToken);
            sessionStorage.setItem('accessToken', user.token);
            return { isLogging: false, loggedIn: true };
        }
        default:
            return state;
    }
};

export function getIsLogging(state$: Observable<State>) {
    return state$.select(state => state.isLogging);
}
export function getIsLoggedIn(state$: Observable<State>) {
    return state$.select(state => state.loggedIn);
}
