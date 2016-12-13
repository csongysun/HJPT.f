import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'app-reducers';
import { apiAction, authAction, appAction, topicAction, yardAction } from 'app-actions';
import { TopicService, AppClientService } from 'app-services';
import { TopicFilter } from 'app-models';

@Injectable()
export class ApiEffects {
    constructor(
        private actions$: Actions,
        private _topic: TopicService,
        private _app: AppClientService,
        private store: Store<fromRoot.State>,

    ) { }

    @Effect()
    getCategories$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.GET_CATEGORIES)
        .switchMap((action) => {
            return this._app.getCategories()
                .map(categories => [success(), new yardAction.CategoriesFulfilAction(categories)])
                .catch(handleError(action, new appAction.MassageAction('get categories failed')))
        });

    @Effect()
    getTopics$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.GET_TOPICS)
        .switchMap((action: apiAction.GetTopicsAction) => {
            return this._topic.GetTopics(action.payload.toQuery())
                .map(rep => {
                    if (rep.meta)
                        return [success(), new topicAction.CollectionFulfilAction(rep.data)];
                    return [success(), new topicAction.SetPageCountAction(rep.meta), new topicAction.CollectionFulfilAction(rep.data)]
                })
                .catch(handleError(action, new appAction.MassageAction('get topics failed')))
        });
    @Effect()
    getRecentTopics$: Observable<Action> = this.actions$
        .ofType(apiAction.ActionTypes.GET_RECENT_TOPICS)
        .switchMap(action => this._topic.GetRecentTopics()
            .map(topics => [success(), new topicAction.RecentTopicsFulfilAction(topics)])
            .catch(handleError(action, new appAction.MassageAction('get topics failed')))
        );

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
            let x = this.store.let(fromRoot.getHasRetried)
                .switchMap(hasRetried => {
                    if (hasRetried) {
                        errorSenderAction.payload = msg;
                        return Observable.from([failed(), errorSenderAction]);
                    }
                    else return Observable.from([new apiAction.PushToRetryAction(currentAction) as Action, retry()]);
                })
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
    return new authAction.refreshAction(new apiAction.RetryAction());
}
