import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { replace, go } from '@ngrx/router-store'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SignUpReq, User, LoginReq } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';
import * as fromRoot from 'app-reducers';
import { authAction } from 'app-actions';
import * as urls from './urls';
@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private api: ApiGatewayService,
    private store: Store<fromRoot.State>
  ) { }

  _login(req: LoginReq): Observable<User> {
    return this.api.post<User>(urls.auth.login, req);
  }
  _logout(): Observable<void> {
    return this.api.get<void>(urls.auth.logout);
  }
  _refresh(rtoken: string): Observable<User> {
    return this.api.get<User>(urls.auth.refresh, { token: rtoken });
  }
  _register(req: SignUpReq): Observable<User> {
    // 加密 password
    return this.api.post(urls.auth.register, req);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.store.let(fromRoot.getIsLogged).do(v => {
      if (v) return;
      if (localStorage.getItem('refreshToken')) {
        this.store.dispatch(new authAction.RefreshAction(replace(url)));
      }
      else {
        console.log('auth failed');
        this.store.dispatch(go('/auth'));
      }
    });
  }
}