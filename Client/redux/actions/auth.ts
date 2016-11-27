
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {

  LOGIN_USER: type('[Auth] Login'),
  LOGOUT_USER: type('[Auth] Logout'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAILED: type('[Auth] Login Failed'),
  REFRESH_USER: type('[Auth] Refresh User'),
  REFRESH_SUCCESS: type('[Auth] Refresh User Success'),
  REFRESH_FAILED: type('[Auth] Refresh User Failed')
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN_USER;
  constructor(public payload: LoginReq) { }
}
export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT_USER;
  constructor() { }
}
export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) { }
}
export class LoginFailedAction implements Action {
  type = ActionTypes.LOGIN_FAILED;
  constructor() { }
}
export class refreshAction implements Action {
  type = ActionTypes.REFRESH_USER;
  constructor(public payload?: Observable<any>) { }
}
export class refreshSuccessAction implements Action {
  type = ActionTypes.REFRESH_SUCCESS;
  constructor(public payload: User) { }
}
export class refreshFailedAction implements Action {
  type = ActionTypes.REFRESH_FAILED;
  constructor() { }
}


export type Actions
  = LoginAction
  | LogoutAction
  | LoginSuccessAction
  | LoginFailedAction
  | refreshAction
  | refreshSuccessAction
  | refreshFailedAction




