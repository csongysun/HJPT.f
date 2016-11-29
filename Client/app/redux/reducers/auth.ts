import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { authAction } from 'app-actions';

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
        case authAction.ActionTypes.LOGIN_FAILED:
        case authAction.ActionTypes.LOGOUT_USER: {
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('accessToken');
            return { isLogging: false, loggedIn: false };
        }
        case authAction.ActionTypes.LOGIN_SUCCESS:
        case authAction.ActionTypes.REFRESH_SUCCESS: {
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
