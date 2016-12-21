
import { Action } from '@ngrx/store';


import { type } from 'app-utils';
import {
    Topic,
    TopicFilter,
    Category,
    Promotion,
    Role,
} from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
    REQUEST_SUCCESS: type('[Api] Api Request Success'),
    REQUEST_FAILED: type('[Api] Request Failed'),
    PUSH_TO_RETRY: type('[Api] Push To Retry'),
    RETRY: type('[Api] Retry'),

    GET_CATEGORIES: type('[Api] Get Categories'),
    GET_PROMOTIONS: type('[Api] Get Promotions'),
    GET_ROLES: type('[Api] Get Roles'),

    GET_TOPICS: type('[Api] Get Topics'),
    GET_RECENT_TOPICS: type('[Api] Get Recent Topics'),
    // CLEAE_USER: type('[App] Clear User')

    // admin
    POST_CATEGORY: type('[Api] Post Category'),
    PUT_CATEGORY: type('[Api] Put Category'),
    DELETE_CATEGORY: type('[Api] Delete Category'),

    POST_PROMOTION: type('[Api] Post Promotion'),
    PUT_PROMOTION: type('[Api] Put Promotion'),
    DELETE_PROMOTION: type('[Api] Delete Promotion'),

    POST_ROLE: type('[Api] Post Role'),
    PUT_ROLE: type('[Api] Put Role'),
    DELETE_ROLE: type('[Api] Delete Role'),
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
export class GetRolesAction implements Action {
    type = ActionTypes.GET_ROLES;
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
    constructor(public payload: { orderId: number, name: string }) { }
}
export class PutCategoryAction implements Action {
    type = ActionTypes.PUT_CATEGORY;
    constructor(public payload: { id: number, category: { orderId: number, name: string } }) { }
}
export class DeleteCategoryAction implements Action {
    type = ActionTypes.DELETE_CATEGORY;
    constructor(public payload: number) { }
}

export class PostPromotionAction implements Action {
    type = ActionTypes.POST_PROMOTION;
    constructor(public payload: Promotion) { }
}
export class PutPromotionAction implements Action {
    type = ActionTypes.PUT_PROMOTION;
    constructor(public payload: { oldId: number, promotion: Promotion }) { }
}
export class DeletePromotionAction implements Action {
    type = ActionTypes.DELETE_PROMOTION;
    constructor(public payload: number) { }
}

export class PostRoleAction implements Action {
    type = ActionTypes.PUT_ROLE;
    constructor(public payload: {name: string}) { }
}
export class PutRoleAction implements Action {
    type = ActionTypes.PUT_ROLE;
    constructor(public payload: { oldId: number, name: string }) { }
}
export class DeleteRoleAction implements Action {
    type = ActionTypes.DELETE_ROLE;
    constructor(public payload: number) { }
}


export type Actions
    = RequestSuccessAction
    | RequestFailedAction
    | PushToRetryAction
    | RetryAction
    | GetCategoriesAction
    | GetPromotionsAction
    | GetRolesAction
    | GetTopicsAction
    | PostCategoryAction
    | PutCategoryAction
    | DeleteCategoryAction
    | PostPromotionAction
    | PutPromotionAction
    | DeletePromotionAction
    | PostRoleAction
    | PutRoleAction
    | DeleteRoleAction
