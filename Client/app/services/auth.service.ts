import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { replace } from '@ngrx/router-store'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SignUpReq, User, LoginReq } from 'app-models';
import { ApiGatewayService } from './http-gateway.service';
import * as fromRoot from 'app-reducers';
import { authAction } from 'app-actions';
@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private api: ApiGatewayService,
    private store: Store<fromRoot.State>
  ) { }

  _login(req: LoginReq): Observable<User> {
    return this.api.post<User>('/api/auth/login', req);
  }
  _logout(): Observable<void> {
    return this.api.get<void>('/api/auth/logout');
  }
  _refresh(): Observable<User> {
    let rtoken = localStorage.getItem('refreshToken');
    if (!rtoken) {
      return Observable.throw('rtoken wrong or null');
    }
    return this.api.get<User>('/api/auth/refresh/' + rtoken);
  }
  _register(req: SignUpReq): Observable<User> {
    // 加密 password
    return this.api.post('/api/auth/register', req);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.store.let(fromRoot.getIsLogged).do(v => {
      if (!v && localStorage.getItem('refreshToken'))
        this.store.dispatch(new authAction.refreshAction(replace(url)));
      else replace('/auth');
    });
  }
}