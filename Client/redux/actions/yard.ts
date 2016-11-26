import { Action } from '@ngrx/store';
import { type } from 'app-utils';

export const ActionTypes = {
  ERROR:         type('[Yard] Error'),
};

export class ErrorAction implements Action {
  type = ActionTypes.ERROR;
  constructor(public payload: string) { }
}

export type Actions
  = ErrorAction

