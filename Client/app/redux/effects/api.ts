
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'app-reducers';
import {
    apiAction,
    authAction,
    appAction,
    topicAction,
    yardAction,
    categoryAction,
    promotionActon,
    roleAction,
} from 'app-actions';
import {
    ApiFactoryService,
} from 'app-services';
import { TopicFilter } from 'app-models';

@Injectable()
export class ApiEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private _api: ApiFactoryService,
    ) { }

    /// category
    //
    @Effect()
    getCategories$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.GET_CATEGORIES)
        .switchMap(action => this._api._getCategories()
            .switchMap(collection => Observable.from([
                new categoryAction.FulfilAction(collection),
                success(),
            ]))
            .catch(handleError(action, appAction.msg('get categories failed')))
        );


    // admin
    @Effect()
    addCategory$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.POST_CATEGORY)
        .debounceTime(250)
        .switchMap((action: apiAction.PostCategoryAction) =>
            this._api._postCategory(action.payload)
                .switchMap(cate => Observable.from([
                    new categoryAction.AddAction(cate),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('add category failed')))
        )
    @Effect()
    updateCategory$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.PUT_CATEGORY)
        .debounceTime(250)
        .switchMap((action: apiAction.PutCategoryAction) =>
            this._api._putCategory(action.payload)
                .switchMap(cate => Observable.from([
                    new categoryAction.UpdateAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('update category failed')))
        )
    @Effect()
    deleteCategory$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.DELETE_CATEGORY)
        .debounceTime(250)
        .switchMap((action: apiAction.DeleteCategoryAction) =>
            this._api._deleteCategory(action.payload)
                .switchMap(() => Observable.from([
                    new categoryAction.DropAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('delete category failed')))
        )
    /// promotion
    //
    @Effect()
    getPromotions$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.GET_PROMOTIONS)
        .switchMap(action => this._api._getPromotions()
            .switchMap(collection => Observable.from([
                new promotionActon.FulfilAction(collection),
                success(),
            ]))
            .catch(handleError(action, appAction.msg('get promotions failed')))
        );

    // admin
    @Effect()
    addPromotion$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.POST_PROMOTION)
        .debounceTime(250)
        .switchMap((action: apiAction.PostPromotionAction) =>
            this._api._postPromotion(action.payload)
                .switchMap(() => Observable.from([
                    new promotionActon.AddAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('add promotion failed')))
        )
    @Effect()
    updatePromotion$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.PUT_PROMOTION)
        .debounceTime(250)
        .switchMap((action: apiAction.PutPromotionAction) =>
            this._api._putPromotion(action.payload)
                .switchMap(() => Observable.from([
                    new promotionActon.UpdateAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('update promotion failed')))
        )
    @Effect()
    deletePromotion$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.DELETE_PROMOTION)
        .debounceTime(250)
        .switchMap((action: apiAction.DeletePromotionAction) =>
            this._api._deletePromotion(action.payload)
                .switchMap(() => Observable.from([
                    new promotionActon.DropAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('delete promotion failed')))
        )
    /// Role
    //
    @Effect()
    getRoles$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.GET_ROLES)
        .debounceTime(250)
        .switchMap(action => this._api._getRoles()
            .switchMap(collection => Observable.from([
                new roleAction.FulfilAction(collection),
                success(),
            ]))
            .catch(handleError(action, appAction.msg('get roles failed')))
        );

    // admin
    @Effect()
    addRole$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.POST_ROLE)
        .debounceTime(250)
        .switchMap((action: apiAction.PostRoleAction) =>
            this._api._postRole(action.payload)
                .switchMap(() => Observable.from([
                    new roleAction.AddAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('add role failed')))
        )
    @Effect()
    updateRole$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.PUT_ROLE)
        .debounceTime(250)
        .switchMap((action: apiAction.PutRoleAction) =>
            this._api._putRole(action.payload)
                .switchMap(() => Observable.from([
                    new roleAction.UpdateAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('update role failed')))
        )
    @Effect()
    deleteRole$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.DELETE_ROLE)
        .debounceTime(250)
        .switchMap((action: apiAction.DeleteRoleAction) =>
            this._api._deleteRole(action.payload)
                .switchMap(() => Observable.from([
                    new roleAction.DropAction(action.payload),
                    success(),
                ]))
                .catch(handleError(action, appAction.msg('delete role failed')))
        )


    //end api




    // retry
    @Effect()
    retryActions$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.RETRY)
        .mergeMap(action => this.store.let(fromRoot.getFailedActions)
            .switchMap(actions => Observable.from(actions))
        );

}

function success() {
    return new apiAction.RequestSuccessAction();
}
function failed() {
    return new apiAction.RequestFailedAction();
}
function handleError(currentAction: Action, errorSenderAction: Action) {
    return (error): Observable<Action> => {
        let msg: string;
        if (error.status === 401) {
            this.store.let(fromRoot.getHasRetried)
                .switchMap(hasRetried => {
                    if (hasRetried) {
                        errorSenderAction.payload = msg;
                        return Observable.from([failed(), errorSenderAction]);
                    }
                    return Observable.from([new apiAction.PushToRetryAction(currentAction) as Action, retry()]);
                });
        }
        if (error.status === 400)
            msg = error.json();
        if (!error.status)
            msg = 'An unexpected error occurred.';
        errorSenderAction.payload = msg;
        return Observable.from([failed(), errorSenderAction]);
    }
}
function retry() {
    return new authAction.RefreshAction(new apiAction.RetryAction());
}
