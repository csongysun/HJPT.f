import { Action } from '@ngrx/store';
import { Topic, TopicFilter } from 'app-models';
import { type } from 'app-utils';


export const ActionTypes = {
  LOAD:                 type('[Collection] Load'),
  LOAD_SUCCESS:         type('[Collection] Load Success'),
  LOAD_FAIL:            type('[Collection] Load Fail'),
};

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: TopicFilter) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Topic[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
