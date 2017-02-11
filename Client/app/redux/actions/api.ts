import {
    Category,
    Promotion,
    Role,
    Topic,
    TopicFilter,
} from 'app-models';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { type } from 'app-utils';

export class ActionTypes {
    static readonly REQUEST_SUCCESS = type('[Api] Api Request Success');
    static readonly REQUEST_FAILED = type('[Api] Request Failed');
    static readonly PUSH_TO_RETRY = type('[Api] Push To Retry');
    static readonly RETRY = type('[Api] Retry');

    static readonly GET_CATEGORIES = type('[Api] Get Categories');
    static readonly GET_PROMOTIONS = type('[Api] Get Promotions');
    static readonly GET_ROLES = type('[Api] Get Roles');

    static readonly GET_TOPICS = type('[Api] Get Topics');
    static readonly GET_RECENT_TOPICS = type('[Api] Get Recent Topics');
    // CLEAE_USER= type('[App] Clear User')
};

export class RequestSuccessAction implements Action {
    readonly type = ActionTypes.REQUEST_SUCCESS;
    constructor(public payload?: Action) { }
}
export class RequestFailedAction implements Action {
    readonly type = ActionTypes.REQUEST_FAILED;
    constructor() { }
}
export class PushToRetryAction implements Action {
    readonly type = ActionTypes.PUSH_TO_RETRY;
    constructor(public payload: Action) { }
}
export class RetryAction implements Action {
    readonly type = ActionTypes.RETRY;
    constructor() { }
}

export class GetCategoriesAction implements Action {
    readonly type = ActionTypes.GET_CATEGORIES;
    constructor() { }
}
export class GetPromotionsAction implements Action {
    readonly type = ActionTypes.GET_PROMOTIONS;
    constructor() { }
}
export class GetRolesAction implements Action {
    readonly type = ActionTypes.GET_ROLES;
    constructor() { }
}
export class GetTopicsAction implements Action {
    readonly type = ActionTypes.GET_TOPICS;
    constructor(public payload?: TopicFilter) { }
}
export class GetRecentTopicsAction implements Action {
    readonly type = ActionTypes.GET_RECENT_TOPICS;
    constructor() { }
}


export type Actions
    = RequestSuccessAction
    | RequestFailedAction
    | PushToRetryAction
    | RetryAction
    | GetCategoriesAction
    | GetPromotionsAction
    | GetRolesAction
    | GetTopicsAction;
