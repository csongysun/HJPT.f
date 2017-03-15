import { Action, ActionReducer } from '@ngrx/store';

import { Category } from '@app/models';
import { Observable } from 'rxjs/Observable';
import { yardAction } from '@app/redux/actions';

export interface State {
    title: string;
}
const initialState: State = {
    title: '',
};

export const reducer: ActionReducer<State> = (state = initialState, action: yardAction.Actions) => {
    switch (action.type) {
        case yardAction.ActionTypes.SET_TITLE:
            return Object.assign({}, state, { title: action.payload });
        default:
            return state;
    }
};

export function getTitle(state$: Observable<State>) {
    return state$.select(state => state.title);
}

