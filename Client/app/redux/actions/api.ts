
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { Topic, TopicFilter } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
    REQUEST_SUCCESS: type('[Api] Api Request Success'),
    REQUEST_FAILED: type('[Api] Request Failed'),
    PUSH_TO_RETRY: type('[Api] Push To Retry'),
    RETRY: type('[Api] Retry'),

    GET_CATEGORIES: type('[Api] Get Categories'),

    GET_TOPICS: type('[Api] Get Topics'),
    GET_RECENT_TOPICS: type('[Api] Get Recent Topics'),
    // CLEAE_USER: type('[App] Clear User')
};

export class RequestSuccessAction implements Action {
    type = ActionTypes.REQUEST_SUCCESS;
    constructor(public payload?: Action) { }
}
export class RequestFailedAction implements Action {
    type = ActionTypes.REQUEST_FAILED;
    constructor() { }
}
export class PushToRetryAction implements Action {
    type = ActionTypes.PUSH_TO_RETRY;
    constructor(public payload: Action) { }
}
export class RetryAction implements Action {
    type = ActionTypes.RETRY;
    constructor() { }
}

export class GetCategoriesAction implements Action {
    type = ActionTypes.GET_CATEGORIES;
    constructor() { }
}

export class GetTopicsAction implements Action {
    type = ActionTypes.GET_TOPICS;
    constructor(public payload?: TopicFilter) { }
}
export class GetRecentTopicsAction implements Action {
    type = ActionTypes.GET_RECENT_TOPICS;
    constructor() { }
}


export type Actions
    = RequestSuccessAction
    | RequestFailedAction
    | PushToRetryAction
    | RetryAction
    | GetCategoriesAction
    | GetTopicsAction
