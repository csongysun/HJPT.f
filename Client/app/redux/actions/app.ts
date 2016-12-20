import { MdSnackBarConfig } from '@angular/material';
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  MASSAGE: type('[App] Massage'),
  FETCH_USER: type('[App] Fetch User'),
  FETCH_ROLES: type('[App] Fetch Roles'),
  //FETCH_CLAIMS: type('[App] Fetch Claims'),
};
export class MassageAction implements Action {
  type = ActionTypes.MASSAGE;
  constructor(public payload: string) { }
}
export class FetchUserAction implements Action {
  type = ActionTypes.FETCH_USER;
  constructor(public payload: User) { }
}
export class FetchRolesAction implements Action {
  type = ActionTypes.FETCH_ROLES;
  constructor(public payload: Array<string>) { }
}

export function msg(massage: string) {
  return new MassageAction(massage);
}

export type Actions
  = MassageAction
  | FetchUserAction
  | FetchRolesAction





