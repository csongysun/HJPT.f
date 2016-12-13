import { MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ActionReducer, Action } from '@ngrx/store';
import { User, Toast, Setting, TopicFilter } from 'app-models';
import { appAction } from 'app-actions';

export interface State {
    user: User;
    setting: {
        filter: {
            pageTake: number,
            categoryId: number
        }
    };
}
export interface AppStateRecord extends TypedRecord<AppStateRecord>, State { }
export const appStateFactory = makeTypedFactory<State, AppStateRecord>({
    user: null,
    setting: defaultSetting()
});
function makeInitialState() {
    return appStateFactory({
        user: null,
        setting: defaultSetting()
    });
}
function defaultSetting() {
    return {
        filter: {
            pageTake: 50,
            categoryId: 0
        }
    };
}

export const reducer: ActionReducer<AppStateRecord> = (state = makeInitialState(), action: appAction.Actions) => {
    switch (action.type) {
        case appAction.ActionTypes.FETCH_USER:
            return state.merge({ user: User });
        default:
            return state;
    }
};

export function getCurrentUser(state$: Observable<AppStateRecord>) {
    return state$.select(state => state.user);
}

export function getSettingFilter(state$: Observable<AppStateRecord>) {
    return state$.select(state => state.setting.filter);
}
