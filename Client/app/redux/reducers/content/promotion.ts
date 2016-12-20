import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { promotionActon } from 'app-actions';

import { Promotion } from 'app-models';
export interface State {
    promotions: Array<Promotion>;
}
const initialState: State = {
    promotions: null
};

export const reducer: ActionReducer<State> = (state = initialState, action: promotionActon.Actions) => {
    switch (action.type) {
        case promotionActon.ActionTypes.FULFIL: {
            let payload = (action as promotionActon.FulfilAction).payload;
            return { promotions: payload };
        }
        case promotionActon.ActionTypes.ADD: {
            let payload = (action as promotionActon.AddAction).payload;
            return { promotions: [payload, ...state.promotions] }
        }
        case promotionActon.ActionTypes.UPDATE: {
            let payload = (action as promotionActon.UpdateAction).payload;
            let i = state.promotions.findIndex(v => v.id === payload.oldId);
            let cs = state.promotions.map(v=>{
                if(v.id === payload.oldId){
                    v = payload.promotion;
                }
                return v;
            })
            return { promotions: cs };
        }
        case promotionActon.ActionTypes.DROP: {
            let payload = (action as promotionActon.DropAction).payload;
            return { promotions: state.promotions.filter(v => v.id !== payload) };
        }
        default:
            return state;
    }
};

export function getPromotions(state$: Observable<State>) {
    return state$.select(state => state.promotions);
}
