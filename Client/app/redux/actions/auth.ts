
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq, SignUpReq } from 'app-models';

export const ActionTypes = {
  LOGIN_USER: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAILED: type('[Auth] Login Failed'),
  LOGOUT_USER: type('[Auth] Logout'),
  LOGOUT_SUCCESS: type('[Auth] Logout Success'),

  REG_USER: type('[Auth] Register'),
  REG_FAILED: type('[Auth] Register Failed'),

  REFRESH_USER: type('[Auth] Refresh User'),
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN_USER;
  constructor(public payload: LoginReq) { }
}
export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) { }
}
export class LoginFailedAction implements Action {
  type = ActionTypes.LOGIN_FAILED;
  constructor() { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT_USER;
  constructor() { }
}
export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;
  constructor() { }
}

export class RegisterAction implements Action {
  type = ActionTypes.REG_USER;
  constructor(public payload: SignUpReq) { }
}
export class RegisterFailedAction implements Action {
  type = ActionTypes.REG_FAILED;
  constructor() { }
}


export class RefreshAction implements Action {
  type = ActionTypes.REFRESH_USER;
  constructor(public payload?: Action) { }
}


export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction
  | LogoutSuccessAction
  | RegisterAction
  | RegisterFailedAction
  | RefreshAction
