import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/ignoreElements';

import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go, back, replace } from '@ngrx/router-store';

import { appAction } from 'app-actions';

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
            let ref = this.toast.open(action.payload);
            setTimeout(function() {
                ref.dismiss();
            }, 2000);
        })
        .ignoreElements();

}
