import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { yardAction } from 'app-actions';

import { Category } from 'app-models';
export interface State {
    title: string;
    categories: Array<Category>;
}
const initialState: State = {
    title: '',
    categories: []
};

export const reducer: ActionReducer<State> = (state = initialState, action: yardAction.Actions) => {

    switch (action.type) {
        case yardAction.ActionTypes.SET_TITLE:
            return Object.assign({}, state, { title: action.payload });
        case yardAction.ActionTypes.CATEGORIES_FULFIL:
            return Object.assign({}, state, { categories: action.payload});
        default:
            return state;
    }
};

export function getTitle(state$: Observable<State>) {
    return state$.select(state => state.title);
}

export function getCategories(state$: Observable<State>) {
    return state$.select(state => state.categories);
}
