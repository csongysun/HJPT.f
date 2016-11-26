import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Topic } from 'app-models';
import { topicAction, collectionAction } from 'app-actions';


export interface State {
    entity: Topic;
    topicId: string;
};

const initialState: State = {
    entity: undefined,
    topicId: ''
};

export function reducer(state = initialState, action: topicAction.Actions): State {
    switch (action.type) {
        //
        case topicAction.ActionTypes.LOAD: {
            const topicId = action.payload;
            return Object.assign({}, state, {topicId: topicId});
        }
        case topicAction.ActionTypes.FULFIL: {
            const topic = action.payload;
            return Object.assign({}, state, {entity: topic, topicId: topic.id});
        }
        default: {
            return state;
        }
    }
}
