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
  constructor(public payload: string) { }
}
export class FetchUserAction implements Action {
  type = ActionTypes.FETCH_USER;
  constructor(public payload: User) { }
}

export function msg(massage: string) {
  return new MassageAction(massage);
}

export type Actions
  = MassageAction
  | FetchUserAction





