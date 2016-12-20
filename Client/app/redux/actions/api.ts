
import { Action } from '@ngrx/store';


import { type } from 'app-utils';
import {
    Topic,
    TopicFilter,
    Category,
    Promotion
} from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
    REQUEST_SUCCESS: type('[Api] Api Request Success'),
    REQUEST_FAILED: type('[Api] Request Failed'),
    PUSH_TO_RETRY: type('[Api] Push To Retry'),
    RETRY: type('[Api] Retry'),

    GET_CATEGORIES: type('[Api] Get Categories'),
    GET_PROMOTIONS: type('[Api] get Promotions'),

    GET_TOPICS: type('[Api] Get Topics'),
    GET_RECENT_TOPICS: type('[Api] Get Recent Topics'),
    // CLEAE_USER: type('[App] Clear User')

    // admin
    POST_CATEGORY: type('[Api] Post Category'),
    PUT_CATEGORY: type('[Api] Put Category'),
    DELETE_CATEGORY: type('[Api] Delete Category'),

    POST_PROMOTIONS: type('[Api] Post Promotion'),
    PUT_PROMOTIONS: type('[Api] Put Promotion'),
    DELETE_PROMOTIONS: type('[Api] Delete Promotion'),
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
export class GetPromotionsAction implements Action {
    type = ActionTypes.GET_PROMOTIONS;
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

// admin
export class PostCategoryAction implements Action {
    type = ActionTypes.POST_CATEGORY;
    constructor(public payload: Category) { }
}
export class PutCategoryAction implements Action {
    type = ActionTypes.PUT_CATEGORY;
    constructor(public payload: { oldId: number, category: Category }) { }
}
export class DeleteCategoryAction implements Action {
    type = ActionTypes.DELETE_CATEGORY;
    constructor(public payload: number) { }
}

export class PostPromotionAction implements Action {
    type = ActionTypes.POST_PROMOTIONS;
    constructor(public payload: Promotion) { }
}
export class PutPromotionAction implements Action {
    type = ActionTypes.PUT_PROMOTIONS;
    constructor(public payload: { oldId: number, promotion: Promotion }) { }
}
export class DeletePromotionAction implements Action {
    type = ActionTypes.DELETE_PROMOTIONS;
    constructor(public payload: number) { }
}

export type Actions
    = RequestSuccessAction
    | RequestFailedAction
    | PushToRetryAction
    | RetryAction
    | GetCategoriesAction
    | GetPromotionsAction
    | GetTopicsAction
    | PostCategoryAction
    | PutCategoryAction
    | DeleteCategoryAction
    | PostPromotionAction
    | PutPromotionAction
    | DeletePromotionAction
