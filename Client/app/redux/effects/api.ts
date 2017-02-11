import * as fromRoot from 'app-reducers';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import {
    apiAction,
    appAction,
    authAction,
    categoryAction,
    promotionActon,
    roleAction,
    topicAction,
    yardAction,
} from 'app-actions';

import {
    ApiFactoryService,
} from 'app-services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

    // end api




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
