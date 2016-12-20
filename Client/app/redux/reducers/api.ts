
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { apiAction } from 'app-actions';

export interface State {
    isBusy: boolean;

    hasRetried: boolean;
    failedActions: Array<apiAction.Actions>;
}
const initialState: State = {
    isBusy: false,

    hasRetried: false,
    failedActions: [],

};
export const reducer: ActionReducer<State> = (state = initialState, action: apiAction.Actions) => {

    switch (action.type) {
        case apiAction.ActionTypes.REQUEST_SUCCESS: {
            return Object.assign({}, state, { isBusy: false, failedActons: [], hasRetried: false });
        }
        case apiAction.ActionTypes.REQUEST_FAILED: {
            return Object.assign({}, state, { isBusy: false, failedActons: [], hasRetried: false });
        }
        case apiAction.ActionTypes.PUSH_TO_RETRY: {
            let payload = (action as apiAction.PushToRetryAction).payload;
            return Object.assign({}, state, { failedActions: [payload, ...state.failedActions] });
        }
        case apiAction.ActionTypes.RETRY: {
            return Object.assign({}, state, { hasRetried: true });
        }

        case apiAction.ActionTypes.GET_CATEGORIES: {
            return Object.assign({}, state, { isBusy: true });
        }

        default:
            return state;
    }
};
export function getIsBusy(state$: Observable<State>) {
    return state$.select(state => state.isBusy);
}
export function getHasRetried(state$: Observable<State>) {
    return state$.select(state => state.hasRetried);
}
export function getFailedActions(state$: Observable<State>) {
    return state$.select(state => state.failedActions);
}
