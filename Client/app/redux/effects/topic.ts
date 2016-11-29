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
