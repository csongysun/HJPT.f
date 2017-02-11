import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User } from 'app-models';

export class ActionTypes {
  static readonly MASSAGE = type('[App] Massage');
  static readonly FETCH_USER = type('[App] Fetch User');
  static readonly FETCH_ROLES = type('[App] Fetch Roles');
  // FETCH_CLAIMS= type('[App] Fetch Claims');
};
export class MassageAction implements Action {
  readonly type = ActionTypes.MASSAGE;
  constructor(public payload: string) { }
}
export class FetchUserAction implements Action {
  readonly type = ActionTypes.FETCH_USER;
  constructor(public payload: User) { }
}
export class FetchRolesAction implements Action {
  readonly type = ActionTypes.FETCH_ROLES;
  constructor(public payload: Array<string>) { }
}

export function msg(massage: string) {
  return new MassageAction(massage);
}

export type Actions
  = MassageAction
  | FetchUserAction
  | FetchRolesAction;





