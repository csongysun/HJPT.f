import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'app-reducers';
import { apiAction, authAction, appAction, topicAction, yardAction } from 'app-actions';
import { TopicFilter } from 'app-models';

@Injectable()
export class TopicEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,

    ) { }

    @Effect()
    setFulfil$: Observable<Action> = this.actions$
        .ofType(topicAction.ActionTypes.SET_FILTER)
        .mergeMap((action: topicAction.SetFilterAction) => Observable.of(new apiAction.GetTopicsAction(action.payload)));

}
