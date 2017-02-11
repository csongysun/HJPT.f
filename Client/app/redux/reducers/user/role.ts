import { Action, ActionReducer } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Role } from 'app-models';
import { roleAction } from 'app-actions';

export interface State {
    roles: Array<Role>;
}
const initialState: State = {
    roles: null
};

export const reducer: ActionReducer<State> = (state = initialState, action: roleAction.Actions) => {
    switch (action.type) {
        case roleAction.ActionTypes.FULFIL: {
            return { roles: action.payload };
        }
        default:
            return state;
    }
};

export function getRoles(state$: Observable<State>) {
    return state$.select(state => state.roles);
}
