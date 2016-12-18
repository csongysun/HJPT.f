
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
    return new authAction.RefreshAction(new apiAction.RetryAction());
}
