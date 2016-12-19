
import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go, back, replace } from '@ngrx/router-store';

import { appAction } from 'app-actions';

import 'app-rxjs';

const roleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private toast: MdSnackBar
    ) {
    }

    @Effect()
    massage$: Observable<Action> = this.actions$
        .ofType(appAction.ActionTypes.MASSAGE)
        .do(action => {
            this.toast.open(action.payload, null, { duration: 2000 });
        })
        .ignoreElements();

    @Effect()
    fetchUser$: Observable<Action> = this.actions$
        .ofType(appAction.ActionTypes.FETCH_USER)
        .mergeMap((action: appAction.FetchUserAction) => {
            let tokenPayload = action.payload.token.split('.')[1];
            let roles = JSON.parse(atob(tokenPayload))[roleClaimType];
            return Observable.from([
                new appAction.FetchRolesAction(roles)
            ]);
        })

}
