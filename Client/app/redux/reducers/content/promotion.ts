import { Action, ActionReducer } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Promotion } from 'app-models';
import { promotionActon } from 'app-actions';

export interface State {
    promotions: Array<Promotion>;
}
const initialState: State = {
    promotions: null
};

export const reducer: ActionReducer<State> = (state = initialState, action: promotionActon.Actions) => {
    switch (action.type) {
        case promotionActon.ActionTypes.FULFIL: {
            return { promotions: action.payload };
        }
        default:
            return state;
    }
};

export function getPromotions(state$: Observable<State>) {
    return state$.select(state => state.promotions);
}
