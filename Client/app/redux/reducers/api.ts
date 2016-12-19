
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { apiAction } from 'app-actions';

export interface State {
    isBusy: boolean;

    hasRetried: boolean;
    failedActons: Array<apiAction.Actions>;
}
const initialState: State = {
    isBusy: false,

    hasRetried: false,
    failedActons: [],

};
export const reducer: ActionReducer<State> = (state = initialState, action: apiAction.Actions) => {

    switch (action.type) {
        case apiAction.ActionTypes.REQUEST_SUCCESS: {
            return Object.assign({}, state, { isBusy: false, failedActons: [], hasRetried: false });
        }
        case apiAction.ActionTypes.REQUEST_FAILED: {
            return Object.assign({}, state, { isBusy: false, failedActons: [], hasRetried: false });
        }
        case apiAction.ActionTypes.RETRY: {
            return Object.assign({}, state, { hasRetried: true });
        }

        case apiAction.ActionTypes.GET_CATEGORIES: {
            
        }


        default:
            return state;
    }
};

export function getHasRetried(state$: Observable<State>) {
    return state$.select(state => state.hasRetried);
}

export function getFailedActions(state$: Observable<State>) {
    return state$.select(state => state.failedActons);
}
