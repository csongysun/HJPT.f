import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go, back, replace } from '@ngrx/router-store';

import { appAction } from 'app-actions';
import { AuthService } from 'app-shared';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private _auth: AuthService
    ) {
    }

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(appAction.ActionTypes.LOGIN_USER)
        .map((action: appAction.LoginAction) => action.payload)
        .switchMap(payload => this._auth._login(payload)
            .map(user => new appAction.LoginSuccessAction(user))
            .catch(error => Observable.from([new appAction.LoginFailedAction, new appAction.ErrorAction(error)]))
        );
    @Effect()
    loginSuccess$: Observable<Action> = this.actions$
        .ofType(appAction.ActionTypes.LOGIN_SUCCESS)
        .mergeMap(() => Observable.of(replace('/')));
    @Effect()
    logout$: Observable<any> = this.actions$
        .ofType(appAction.ActionTypes.LOGOUT_USER)
        .mergeMap(() => this._auth._logout());
    @Effect()
    refreshUser$: Observable<Action> = this.actions$
        .ofType(appAction.ActionTypes.REFRESH_USER)
        .map((action: appAction.refreshAction) => action.payload)
        .switchMap((next) => this._auth._refresh()
            .map(user => new appAction.refreshSuccessAction(user))
            .do(() => next)
            .catch(error => Observable.from([new appAction.refreshFailedAction, new appAction.ErrorAction(error)]))
        );
    @Effect()
    refreshFailed$: Observable<Action> = this.actions$
        .ofType(appAction.ActionTypes.REFRESH_FAILED)
        .mergeMap(() => Observable.of(replace('/auth')));

}
