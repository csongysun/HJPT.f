import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Guard, Router, Route, TraversalCandidate } from '@ngrx/router';
import { go } from '@ngrx/router-store';

import { SignUpReq, User, LoginReq } from 'app-models';
import { AppClientService, ApiGatewayService } from 'app-shared';
import { AppState, LOGIN_USER, LOGOUT_USER } from 'app';
import { appAction } from 'app-actions';

@Injectable()
export class AuthService implements Guard {

  constructor(
    private api: ApiGatewayService,
    private store: Store<AppState>,
    private router: Router
  ) {
  }



  _login(req: LoginReq): Observable<User> {
    return this.api.post('/api/auth/login', req)
      .map(user => {
        sessionStorage.setItem('accessToken', user.token);
        localStorage.setItem('refreshToken', user.refreshToken);
        return user;
      });
  }
  _logout(): Observable<void> {
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('token');
    this.store.dispatch({ type: LOGOUT_USER });
    return this.api.get('/api/auth/logout');
  }
  _refresh(): Observable<User> {
    let rtoken = localStorage.getItem('refresh_token');
    if (!rtoken) {
      return Observable.throw('rtoken wrong or null');
    }
    return this.api.get('/api/auth/refresh/' + rtoken)
      .map(data => {
        let user = data as User;
        if (!user) throw ('Data Deserialize Failed');
        sessionStorage.setItem('accessToken', user.token);
        // localStorage.setItem('refreshToken', user.refreshToken);
        return user;
      });
  }
  _register(req: SignUpReq) {
    // 加密 password
    return this.api.post('/api/auth/register', req)
      .map(data => {
        let user = data as User;
        if (!user) throw ('Data Deserialize Failed');
        this.store.dispatch({ type: LOGIN_USER, payload: user });
        sessionStorage.setItem('accessToken', user.token);
        localStorage.setItem('refreshToken', user.refreshToken);
      });
  }

  protectRoute(candidate: TraversalCandidate) {

    if (this.store.select<User>('loggedInUser')) {
      return Observable.of(true);
    }
    // `route` is the current route being evaluated
    const route: Route = candidate.route;
    this.store.dispatch(new appAction.refreshAction())
    return Observable.of(false);
  }
}
