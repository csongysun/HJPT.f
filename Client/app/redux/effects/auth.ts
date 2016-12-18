
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go, back, replace } from '@ngrx/router-store';

import { authAction, appAction } from 'app-actions';
import { AuthService } from 'app-services';

import 'app-rxjs';
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
        .map((action: authAction.LoginAction) => action.payload)
        .mergeMap(payload => this._auth._login(payload)
            .switchMap(user => Observable.from([
                new authAction.LoginSuccessAction(user),
                new appAction.MassageAction('Login Success'),
                replace('/')]))
            .catch(error => {
                return Observable.from([
                    new authAction.LoginFailedAction(),
                    appAction.msg(error._body),
                ])
            })
        );
    @Effect()
    loginSuccess$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.LOGIN_SUCCESS)
        .map((action: authAction.LoginSuccessAction) => action.payload)
        .mergeMap(user => Observable.from([
            new appAction.FetchUserAction(user),
        ]));

    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.REG_USER)
        .debounceTime(1000)
        .map((action: authAction.RegisterAction) => action.payload)
        .mergeMap(payload => this._auth._register(payload)
            .switchMap(() => Observable.from([
                new appAction.MassageAction('注册成功'),
                new authAction.LoginAction({ email: payload.email, password: payload.password })
            ]))
            .catch(error => Observable.from([
                new authAction.LoginFailedAction, new appAction.MassageAction(error._body)]))
        );
    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.LOGOUT_USER)
        .switchMap(() =>
            this._auth._logout()
                .switchMap(() => Observable.from([
                    new authAction.LogoutSuccessAction(),
                    new appAction.FetchUserAction(null),
                    new appAction.MassageAction('Logout success'),
                    replace('/auth')
                ]))
                .catch(error => Observable.from([
                    new appAction.MassageAction('logout error') as Action,
                ]))
        );
    // refresh_user -> refresh_success 
    //              -> logout
    @Effect()
    refreshUser$: Observable<Action> = this.actions$
        .ofType(authAction.ActionTypes.REFRESH_USER)
        .switchMap(action => {
            let rtoken = localStorage.getItem('refreshToken');
            if (!rtoken) {
                return Observable.of(new appAction.FetchUserAction(null) as Action);
            }
            return this._auth._refresh(rtoken)
                .switchMap(user => {
                    var actions: Action[] = [new authAction.LoginSuccessAction(user)];
                    if (action.payload) actions.push(action.payload);
                    return Observable.from(actions);
                })
                .catch(error => Observable.from([
                    new authAction.LogoutAction as Action,
                    new appAction.MassageAction('auth failed')
                ]))
        });
}
