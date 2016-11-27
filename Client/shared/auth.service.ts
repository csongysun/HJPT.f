import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SignUpReq, User, LoginReq } from 'app-models';
import { AppClientService, ApiGatewayService } from 'app-shared';
import { EventAggregater } from 'app-services';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private api: ApiGatewayService,
    private app: AppClientService,
    private router: Router,
    private event: EventAggregater
  ) {

  }

  _login(req: LoginReq): Observable<User> {
    return this.api.post<User>('/api/auth/login', req)
      .do(user => this.event.GetEvent<User>('LOAD_USER').publish(user))
      ;
  }
  _logout(): Observable<void> {
    return this.api.get<void>('/api/auth/logout');
  }
  _refresh(): Observable<User> {
    let rtoken = localStorage.getItem('refreshToken');
    if (!rtoken) {
      return Observable.throw('rtoken wrong or null');
    }
    return this.api.get<User>('/api/auth/refresh/' + rtoken)
      .do(user => this.event.GetEvent<User>(typeof user).publish(user))
      .catch(err => { this.logoutInternal(); return err; });
  }
  _register(req: SignUpReq) {
    // 加密 password
    return this.api.post('/api/auth/register', req);
  }

  logoutInternal() {
    this.router.navigate(['/auth']);
  }

  canActivate(): Observable<boolean> {
    if (this.app.currentUser)
      return Observable.of(true);
    if (!localStorage.getItem('refreshToken')) {
      this.router.navigate(['/auth']);
      return Observable.of(false);
    }
    return this._refresh()
      .map(user => true)
      .catch(err => Observable.of(false));
  }
}