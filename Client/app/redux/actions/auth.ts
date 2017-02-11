
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq, SignUpReq } from 'app-models';

export class ActionTypes {
  static readonly LOGIN_USER = type('[Auth] Login');
  static readonly LOGIN_SUCCESS = type('[Auth] Login Success');
  static readonly LOGIN_FAILED = type('[Auth] Login Failed');
  static readonly LOGOUT_USER = type('[Auth] Logout');
  static readonly LOGOUT_SUCCESS = type('[Auth] Logout Success');

  static readonly REG_USER = type('[Auth] Register');
  static readonly REG_FAILED = type('[Auth] Register Failed');

  static readonly REFRESH_USER = type('[Auth] Refresh User');
};

export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN_USER;
  constructor(public payload: LoginReq) { }
}
export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) { }
}
export class LoginFailedAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILED;
  constructor() { }
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT_USER;
  constructor() { }
}
export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
  constructor() { }
}

export class RegisterAction implements Action {
  readonly type = ActionTypes.REG_USER;
  constructor(public payload: SignUpReq) { }
}
export class RegisterFailedAction implements Action {
  readonly type = ActionTypes.REG_FAILED;
  constructor() { }
}


export class RefreshAction implements Action {
  readonly type = ActionTypes.REFRESH_USER;
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
  | RefreshAction;
