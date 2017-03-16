import * as fromRoot from '@app/redux/reducers';
import * as urls from './api/urls';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginReq, SignUpReq, User } from '@app/models';

import { ApiGatewayService } from './http-gateway.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService implements CanActivate {

  private currentUserSource = new Subject<User>();
  currentUser$ = this.currentUserSource.asObservable();
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  constructor(
    private api: ApiGatewayService,
    private router: Router
  ) { }

  _login(req: LoginReq): Observable<void> {
    return this.api.post(urls.auth.login, req)
      .map(v => {
        this.setCurrentUser(v);
      });
  }
  _logout(): Observable<void> {
    return this.api.get(urls.auth.logout)
      .map(() => {
        this.setCurrentUser(null);
      });
  }
  _refresh(rtoken: string): Observable<void> {
    return this.api.get(urls.auth.refresh)
      .map(v => {
        this.setCurrentUser(v);
      });
  }
  _register(req: SignUpReq): Observable<void> {
    // 加密 password
    return this.api.post(urls.auth.register, req)
      .concatMap(v => this._login({ email: req.email, password: req.password }));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.currentUser$.concatMap(v => {
      if (v) {
        return Observable.of(true);
      }
      let rtoken = localStorage.getItem('refreshToken');
      if (rtoken) {
        return this._refresh(rtoken).map(() => true)
          .catch(err => {
            this.router.navigate(['/auth']);
            return Observable.of(false);
          });
      }
      this.router.navigate(['/auth']);
      return Observable.of(false);
    });
  }
}