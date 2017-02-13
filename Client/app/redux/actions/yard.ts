import { Action } from '@ngrx/store';
import { Category } from 'app-models';
import { Observable } from 'rxjs/Observable';
import { type } from 'app-utils';

export const ActionTypes = {
  SET_TITLE: type('[Yard] Set Title'),
};

export class SetTitleAction implements Action {
  type = ActionTypes.SET_TITLE;
  constructor(public payload: string) { }
}


export type Actions
  = SetTitleAction;

