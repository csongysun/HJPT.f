
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { Topic, TopicFilter } from 'app-models';
import { Observable } from 'rxjs/Observable';

export const ActionTypes = {
  SET_FILTER: type('[Topic] Set Filter'),
  SET_PAGE_COUNT: type('[Topic] Set Page Count'),
  RECENT_FULFIL: type('[Topic] Topic Fulfil'),
  COLLECTION_FULFIL: type('[Topic] Collection Fulfil'),
};
export class SetFilterAction implements Action {
  type = ActionTypes.SET_FILTER;
  constructor(public payload: TopicFilter) { }
}
export class SetPageCountAction implements Action {
  type = ActionTypes.SET_PAGE_COUNT;
  constructor(public payload: number) { }
}
export class RecentTopicsFulfilAction implements Action {
  type = ActionTypes.RECENT_FULFIL;
  constructor(public payload: Array<Topic>) { }
}
export class CollectionFulfilAction implements Action {
  type = ActionTypes.COLLECTION_FULFIL;
  constructor(public payload: Array<Topic>) { }
}

export type Actions
  = SetFilterAction
  | SetPageCountAction
  | RecentTopicsFulfilAction
  | CollectionFulfilAction
