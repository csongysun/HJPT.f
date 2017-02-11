import { Action, ActionReducer } from '@ngrx/store';

import { Category } from 'app-models';
import { Observable } from 'rxjs/Observable';
import { categoryAction } from 'app-actions';

export interface State {
    categories: Array<Category>;
}
const initialState: State = {
    categories: null
};

export const reducer: ActionReducer<State> = (state = initialState, action: categoryAction.Actions) => {
    switch (action.type) {
        case categoryAction.ActionTypes.FULFIL: {
            return { categories: action.payload };
        }
        default:
            return state;
    }
};

export function getCategories(state$: Observable<State>) {
    return state$.select(state => state.categories);
}
