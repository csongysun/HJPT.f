
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq, SignUpReq } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  LOGIN_USER: type('[Auth] Login'),
  LOGOUT_USER: type('[Auth] Logout'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAILED: type('[Auth] Login Failed'),
  
  REG_USER: type('[Auth] Register'),

  REFRESH_USER: type('[Auth] Refresh User'),
  REFRESH_SUCCESS: type('[Auth] Refresh User Success'),
  REFRESH_FAILED: type('[Auth] Refresh User Failed')
};

export class loginAction implements Action {
  type = ActionTypes.LOGIN_USER;
  constructor(public payload: LoginReq) { }
}
export class logoutAction implements Action {
  type = ActionTypes.LOGOUT_USER;
  constructor() { }
}
export class loginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) { }
}
export class loginFailedAction implements Action {
  type = ActionTypes.LOGIN_FAILED;
  constructor() { }
}

export class registerAction implements Action {
  type = ActionTypes.REG_USER;
  constructor(public payload: SignUpReq) { }
}

export class refreshAction implements Action {
  type = ActionTypes.REFRESH_USER;
  constructor(public payload?: Action) { }
}
export class refreshSuccessAction implements Action {
  type = ActionTypes.REFRESH_SUCCESS;
  constructor(public payload: User) { }
}
export class refreshFailedAction implements Action {
  type = ActionTypes.REFRESH_FAILED;
  constructor() { }
}

export interface NextActionPayload {
  user: User;
  action?: Action;
}


export type Actions
  = loginAction
  | logoutAction
  | loginSuccessAction
  | loginFailedAction
  | registerAction
  | refreshAction
  | refreshSuccessAction
  | refreshFailedAction




