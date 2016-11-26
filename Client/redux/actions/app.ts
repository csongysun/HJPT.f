
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  ERROR: type('[App] Error'),
  LOGIN_USER: type('[App] Login'),
  LOGOUT_USER: type('[App] Logout'),
  LOGIN_SUCCESS: type('[App] Login Success'),
  LOGIN_FAILED: type('[App] Login Failed'),
  REFRESH_USER: type('[App] Refresh User'),
  REFRESH_SUCCESS: type('[App] Refresh User Success'),
  REFRESH_FAILED: type('[App] Refresh User Failed')
};

export class ErrorAction implements Action {
  type = ActionTypes.ERROR;
  constructor(public payload: string) { }
}
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
  = ErrorAction
  | LoginAction
  | LogoutAction
  | LoginSuccessAction
  | LoginFailedAction
  | refreshAction
  | refreshSuccessAction
  | refreshFailedAction




