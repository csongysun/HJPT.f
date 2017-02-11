
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

    // admin
    static readonly POST_CATEGORY = type('[Api] Post Category');
    static readonly PUT_CATEGORY = type('[Api] Put Category');
    static readonly DELETE_CATEGORY = type('[Api] Delete Category');

    static readonly POST_PROMOTION = type('[Api] Post Promotion');
    static readonly PUT_PROMOTION = type('[Api] Put Promotion');
    static readonly DELETE_PROMOTION = type('[Api] Delete Promotion');

    static readonly POST_ROLE = type('[Api] Post Role');
    static readonly PUT_ROLE = type('[Api] Put Role');
    static readonly DELETE_ROLE = type('[Api] Delete Role');
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

// admin
export class PostCategoryAction implements Action {
    readonly type = ActionTypes.POST_CATEGORY;
    constructor(public payload: { orderId: number, name: string }) { }
}
export class PutCategoryAction implements Action {
    readonly type = ActionTypes.PUT_CATEGORY;
    constructor(public payload: Category) { }
}
export class DeleteCategoryAction implements Action {
    readonly type = ActionTypes.DELETE_CATEGORY;
    constructor(public payload: number) { }
}

export class PostPromotionAction implements Action {
    readonly type = ActionTypes.POST_PROMOTION;
    constructor(public payload: Promotion) { }
}
export class PutPromotionAction implements Action {
    readonly type = ActionTypes.PUT_PROMOTION;
    constructor(public payload: Promotion) { }
}
export class DeletePromotionAction implements Action {
    readonly type = ActionTypes.DELETE_PROMOTION;
    constructor(public payload: number) { }
}

export class PostRoleAction implements Action {
    readonly type = ActionTypes.PUT_ROLE;
    constructor(public payload: Role) { }
}
export class PutRoleAction implements Action {
    readonly type = ActionTypes.PUT_ROLE;
    constructor(public payload: Role) { }
}
export class DeleteRoleAction implements Action {
    readonly type = ActionTypes.DELETE_ROLE;
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
