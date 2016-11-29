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
import { AuthService } from 'app-services';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private _auth: AuthService
    ) {
    }

    // login => login_success
    //       => login_failed
    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.LOGIN_USER)
        .debounceTime(1000)
        .map((action: authAction.loginAction) => action.payload)
        .mergeMap(payload => this._auth._login(payload)
            .switchMap(user => Observable.from([
                new appAction.FetchUserAction(user),
                new authAction.loginSuccessAction(user),
                replace('/')]))
            .catch(error => Observable.of(new appAction.MassageAction({ key: 'auth', massage: error.body })))
        );

    // register => login_success
    //          => login_failed
    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.REG_USER)
        .debounceTime(1000)
        .map((action: authAction.registerAction) => action.payload)
        .mergeMap(payload => this._auth._register(payload)
            .switchMap(user => Observable.from([
                new authAction.loginSuccessAction(user)]))
            .catch(error => Observable.from([
                new authAction.loginFailedAction]))
        );
    // logout => fetch_user(null) AND go('/auth')
    @Effect()
    logout$: Observable<any> = this.actions$
        .ofType(authAction.ActionTypes.LOGOUT_USER)
        .mergeMap(() => this._auth._logout()
            .switchMap(user => Observable.from([
                new appAction.FetchUserAction(null),
                replace('/auth')
            ]))
        );
    // refresh_user -> refresh_success 
    //              -> logout
    @Effect()
    refreshUser$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.REFRESH_USER)
        .debounceTime(200)
        .switchMap((action: authAction.refreshAction) => this._auth._refresh()
            .map(user => [new authAction.refreshSuccessAction(user), new appAction.FetchUserAction(user), action.payload])
            .catch(error => Observable.from([
                new authAction.logoutAction,
                new appAction.MassageAction({ key: 'auth', massage: 'auth failed' })
            ]))
        );
}
