import { MdSnackBarConfig } from '@angular/material';
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  MASSAGE: type('[App] Error'),
  SET_TOAST_CONFIG: type('[App] Set SnackBar'),
  ADD_TOAST_CONFIG: type('[App] Add Toast Config'),
  FETCH_USER: type('[App] Fetch User'),
};
export class MassageAction implements Action {
  type = ActionTypes.MASSAGE;
  constructor(public payload: { key: string, massage: string }) { }
}
export class SetToastConfigAction implements Action {
  type = ActionTypes.SET_TOAST_CONFIG;
  constructor(public payload?: string) { }
}
export class AddToastConfigAction implements Action {
  type = ActionTypes.ADD_TOAST_CONFIG;
  constructor(public payload: { key: string, config: MdSnackBarConfig }) { }
}
export class FetchUserAction implements Action {
  type = ActionTypes.FETCH_USER;
  constructor(public payload: User) { }
}

export function msg(key: string, massage: string) {
  return new MassageAction({ key: key, massage: massage });
}

export type Actions
  = MassageAction
  | SetToastConfigAction
  | AddToastConfigAction
  | FetchUserAction





