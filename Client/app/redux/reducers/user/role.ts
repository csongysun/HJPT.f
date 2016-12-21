import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { roleAction } from 'app-actions';

import { Role } from 'app-models';
export interface State {
    roles: Array<Role>;
}
const initialState: State = {
    roles: null
};

export const reducer: ActionReducer<State> = (state = initialState, action: roleAction.Actions) => {
    switch (action.type) {
        case roleAction.ActionTypes.FULFIL: {
            let payload = (action as roleAction.FulfilAction).payload;
            return { roles: payload };
        }
        case roleAction.ActionTypes.ADD: {
            let payload = (action as roleAction.AddAction).payload;
            return { roles: [payload, ...state.roles] }
        }
        case roleAction.ActionTypes.UPDATE: {
            let payload = (action as roleAction.UpdateAction).payload;
            let i = state.roles.findIndex(v => v.id === payload.oldId);
            let cs = state.roles.map(v=>{
                if(v.id === payload.oldId){
                    v = payload.role;
                }
                return v;
            })
            return { roles: cs };
        }
        case roleAction.ActionTypes.DROP: {
            let payload = (action as roleAction.DropAction).payload;
            return { roles: state.roles.filter(v => v.id !== payload) };
        }
        default:
            return state;
    }
};

export function getRoles(state$: Observable<State>) {
    return state$.select(state => state.roles);
}
