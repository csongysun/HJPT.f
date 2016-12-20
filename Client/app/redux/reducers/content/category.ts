import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { categoryAction } from 'app-actions';

import { Category } from 'app-models';
export interface State {
    categories: Array<Category>;
}
const initialState: State = {
    categories: []
};

export const reducer: ActionReducer<State> = (state = initialState, action: categoryAction.Actions) => {
    switch (action.type) {
        case categoryAction.ActionTypes.FULFIL: {
            let payload = (action as categoryAction.FulfilAction).payload;
            return { categories: payload };
        }
        case categoryAction.ActionTypes.ADD: {
            let payload = (action as categoryAction.AddAction).payload;
            return { categories: [payload, ...state.categories] }
        }
        case categoryAction.ActionTypes.UPDATE: {
            let payload = (action as categoryAction.UpdateAction).payload;
            let i = state.categories.findIndex(v => v.id === payload.oldId);
            let cs = state.categories.map(v=>{
                if(v.id === payload.oldId){
                    v = payload.category;
                }
                return v;
            })
            return { categories: cs };
        }
        case categoryAction.ActionTypes.DROP: {
            let payload = (action as categoryAction.DropAction).payload;
            return { categories: state.categories.filter(v => v.id !== payload) };
        }
        default:
            return state;
    }
};

export function getCategories(state$: Observable<State>) {
    return state$.select(state => state.categories);
}
