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

import { authAction, appAction } from 'app-actions';
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
        .ofType(authAction.ActionTypes.LOGIN_USER)
        .map((action: authAction.LoginAction) => action.payload)
        .switchMap(payload => this._auth._login(payload)
            .switchMap(user => Observable.from([
                new authAction.LoginSuccessAction(user),
                new appAction.FetchUserAction(user)]))
            .catch(error => Observable.from([
                new authAction.LoginFailedAction,
                new appAction.ErrorAction(error)]))
        );
    @Effect()
    loginSuccess$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.LOGIN_SUCCESS)
        .mergeMap(() => Observable.of(replace('/')));
    @Effect()
    logout$: Observable<any> = this.actions$
        .ofType(authAction.ActionTypes.LOGOUT_USER)
        .mergeMap(() => this._auth._logout())
        .;
    @Effect()
    refreshUser$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.REFRESH_USER)
        .map((action: authAction.refreshAction) => action.payload)
        .switchMap((next) => this._auth._refresh()
            .map(user => new authAction.refreshSuccessAction(user))
            .do(() => next)
            .catch(error => Observable.from([new authAction.refreshFailedAction, new appAction.ErrorAction(error)]))
        );
    @Effect()
    refreshFailed$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.REFRESH_FAILED)
        .mergeMap(() => Observable.of(replace('/auth')));

}
