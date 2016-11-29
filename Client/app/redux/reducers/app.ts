import { MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ActionReducer, Action } from '@ngrx/store';
import { User, Toast, Setting, TopicFilter } from 'app-models';
import { appAction } from 'app-actions';

export interface State {
    user: User;
    massage: string;
    snackBarConfig: MdSnackBarConfig;
    snackBarConfigMap: Map<string, MdSnackBarConfig>;
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
    massage: '',
    snackBarConfig: null,
    snackBarConfigMap: null,
    setting: defaultSetting()
});
function makeInitialState() {
    return appStateFactory({
        user: null,
        massage: '',
        snackBarConfig: null,
        snackBarConfigMap: new Map<string, MdSnackBarConfig>(),
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
        case appAction.ActionTypes.MASSAGE: {
            const snackbar = {
                massage: action.payload.massage,
                snackBarConfig: state.snackBarConfigMap.get(action.payload.key)
            }
            return state.merge(snackbar);
        }
        case appAction.ActionTypes.SET_TOAST_CONFIG:
            return state.merge({ snackBarConfig: state.snackBarConfigMap.get(action.payload) });
        case appAction.ActionTypes.ADD_TOAST_CONFIG:
            return state.merge({ snackBarConfigMap: state.snackBarConfigMap.set(action.payload.key, action.payload.config) });
        case appAction.ActionTypes.FETCH_USER:
            return state.merge({ user: User });
        default:
            return state;
    }
};

export function getCurrentUser(state$: Observable<AppStateRecord>) {
    return state$.select(state => state.user);
}
export function getToast(state$: Observable<AppStateRecord>) {
    return state$.select(state => {
        return new Toast(state.massage, state.snackBarConfig);
    });
}
export function getSettingFilter(state$: Observable<AppStateRecord>) {
    return state$.select(state => state.setting.filter);
}
