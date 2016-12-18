import { MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ActionReducer, Action } from '@ngrx/store';
import { User, Toast, Setting, TopicFilter } from 'app-models';
import { appAction } from 'app-actions';

export interface State {
    user: User;
    roles: Array<string>;
    setting: {
        filter: {
            pageTake: number,
            categoryId: number
        }
    };
}
const initialState: State = {
    user: null,
    roles: [],
    setting: defaultSetting()
};
function defaultSetting() {
    return {
        filter: {
            pageTake: 50,
            categoryId: 0
        }
    };
}

export const reducer: ActionReducer<State> = (state = initialState, action: appAction.Actions) => {
    switch (action.type) {
        case appAction.ActionTypes.FETCH_USER: {
            return Object.assign({}, state, { user: action.payload });
        }
        case appAction.ActionTypes.FETCH_ROLES: {
            return Object.assign({}, state, { roles: action.payload });
        }
        default:
            return state;
    }
};


export function getCurrentUser(state$: Observable<State>) {
    return state$.select(state => state.user);
}

export function getCurrentRoles(state$: Observable<State>) {
    return state$.select(state => state.roles);
}

export function getSettingFilter(state$: Observable<State>) {
    return state$.select(state => state.setting.filter);
}
