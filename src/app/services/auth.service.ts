import * as urls from './api/urls';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginReq, SignUpReq, User } from '@app/models';

import { ApiGatewayService } from './http-gateway.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const roleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

@Injectable()
export class AuthService implements CanActivate {

 private currentUserSource = new BehaviorSubject<User>(null);
  get currentUser$() { return this.currentUserSource.asObservable(); };
  setCurrentUser(user: User) {
    if (user) {
      localStorage.setItem('accessToken', user.token);
      localStorage.setItem('refreshToken', user.refreshToken);

      let tokenPayload = user.token.split('.')[1];
      let roles = JSON.parse(atob(tokenPayload))[roleClaimType];
      user.role = roles || [];
      console.log(user);
      this.currentUserSource.next(user);
    }
  }

  get isAdmin$() {
    return this.currentUser$.map(v => v != null ? v.role.includes('admin') : false);
  }

  constructor(
    private api: ApiGatewayService,
    private router: Router
  ) {
    this.api.setCurrentUser = this.setCurrentUser;
  }

  _login(req: LoginReq): Observable<void> {
    return this.api.post(urls.auth.login, req)
      .map(v => {
        this.setCurrentUser(v);
      });
  }
  _logout(): Observable<void> {
    return this.api.get(urls.auth.logout)
      .map(() => {
        localStorage.clear();
        this.router.navigate(['/auth']);
        this.setCurrentUser(null);
      });
  }
  _refresh(): Observable<void> {
    const rtoken = localStorage.getItem('refreshToken');
    return this.api.get(urls.auth.refresh + `?token=${rtoken}`)
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
      if (localStorage.getItem('refreshToken')) {
        return this._refresh().map(() => true)
          .catch(err => {
            this.router.navigate(['/auth']);
            return Observable.of(false);
          });
      }
      this.router.navigate(['/auth']);
      return Observable.of(false);
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.currentUser$.concatMap(v => {
      if (v) {
        return Observable.of(true);
      }
      if (localStorage.getItem('refreshToken')) {
        return this._refresh().map(() => true)
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