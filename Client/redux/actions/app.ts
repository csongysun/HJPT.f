
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { User, LoginReq } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  ERROR: type('[App] Error'),
  FETCH_USER: type('[App] Fetch User')
};
export class ErrorAction implements Action {
  type = ActionTypes.ERROR;
  constructor(public payload: string) { }
}
export class FetchUserAction implements Action {
  type = ActionTypes.FETCH_USER;
  constructor(public payload: User) { }
}



export type Actions
  = ErrorAction
  | FetchUserAction





