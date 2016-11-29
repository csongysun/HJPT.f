
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { Observable } from 'rxjs/Observable';

import { Category } from 'app-models';

export const ActionTypes = {
  SET_TITLE: type('[Yard] Set Title'),

  CATEGORIES_FULFIL: type('[Yard] Categories Fulfil'),

  // CLEAE_USER: type('[App] Clear User')
};

export class SetTitleAction implements Action {
  type = ActionTypes.SET_TITLE;
  constructor(public payload: string) { }
}
export class CategoriesFulfilAction implements Action {
  type = ActionTypes.CATEGORIES_FULFIL;
  constructor(public payload: Array<Category>) { }
}

export type Actions
  = SetTitleAction
  | CategoriesFulfilAction

