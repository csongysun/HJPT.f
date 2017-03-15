import * as fromRoot from '@app/redux/reducers';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { apiAction, appAction, authAction, topicAction, yardAction } from '@app/redux/actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TopicFilter } from '@app/models';

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
