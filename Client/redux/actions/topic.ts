import { Action } from '@ngrx/store';
import { Topic } from 'app-models';
import { type } from 'app-utils';

export const ActionTypes = {
  LOAD:         type('[Topic] Load'),
  FULFIL:       type('[Topic] Fulfil')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: string) { }
}

export class FulfilAction implements Action {
  type = ActionTypes.FULFIL;
  constructor(public payload: Topic) { }
}

export type Actions
  = LoadAction
  | FulfilAction

