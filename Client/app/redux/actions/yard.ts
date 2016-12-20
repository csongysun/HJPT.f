
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { Observable } from 'rxjs/Observable';

import { Category } from 'app-models';

export const ActionTypes = {
  SET_TITLE: type('[Yard] Set Title'),
};

export class SetTitleAction implements Action {
  type = ActionTypes.SET_TITLE;
  constructor(public payload: string) { }
}


export type Actions
  = SetTitleAction

