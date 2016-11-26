import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Topic } from 'app-models';
import { yardAction } from 'app-actions';


export interface State {
    error: string;
};

const initialState: State = {
    error: null
};

export function reducer(state = initialState, action: yardAction.Actions): State {
    switch (action.type) {
        case yardAction.ActionTypes.ERROR: {
            const error = action.payload;
            return Object.assign({}, state, {error: error});
        }
        default: {
            return state;
        }
    }
}
