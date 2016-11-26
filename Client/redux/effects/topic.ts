import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { topicAction, appAction } from 'app-actions';
import { TopicService } from 'app-services';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private _topic: TopicService
    ) { }

    @Effect()
    loadTopic$: Observable<Action> = this.actions$
        .ofType(topicAction.ActionTypes.LOAD)
        .map((action: topicAction.LoadAction) => action.payload)
        .switchMap(payload => this._topic.GetTopic(payload)
            .map(topic => new topicAction.FulfilAction(topic))
            .catch(error => Observable.of(new appAction.ErrorAction(error)))
        );
}
