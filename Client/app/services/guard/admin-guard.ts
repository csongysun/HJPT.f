import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { replace, go } from '@ngrx/router-store'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from 'app-reducers';
import { authAction } from 'app-actions';
import { ApiGatewayService } from '../http-gateway.service';
import { AuthService } from '../auth.service';
import * as urls from '../urls';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private api: ApiGatewayService,
        private auth: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    _check(): Observable<boolean> {
        return this.api.get(urls.admin.check)
            .map(() => true)
            .catch(err => Observable.of(false));
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;
        return this.store.let(fromRoot.getIsLogged)
            .switchMap(u => {
                if (!u) {
                    if (localStorage.getItem('refreshToken')) {
                        this.store.dispatch(new authAction.RefreshAction(replace(url)));
                    } else {
                        this.store.dispatch(replace('/auth'));
                    }
                    return Observable.of(false);
                };
                return this.store.let(fromRoot.getCurrentRoles)
                    .map(roles => roles.indexOf('Administrator') !== -1);
            })
    }
}