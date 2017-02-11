
import { Action } from '@ngrx/store';
import { type } from 'app-utils';
import { Topic, TopicFilter } from 'app-models';

export class ActionTypes {
  static readonly SET_FILTER = type('[Topic] Set Filter');
  static readonly SET_PAGE_COUNT = type('[Topic] Set Page Count');
  static readonly RECENT_FULFIL = type('[Topic] Topic Fulfil');
  static readonly COLLECTION_FULFIL = type('[Topic] Collection Fulfil');
};
export class SetFilterAction implements Action {
  readonly type = ActionTypes.SET_FILTER;
  constructor(public payload: TopicFilter) { }
}
export class SetPageCountAction implements Action {
  readonly type = ActionTypes.SET_PAGE_COUNT;
  constructor(public payload: number) { }
}
export class RecentTopicsFulfilAction implements Action {
  readonly type = ActionTypes.RECENT_FULFIL;
  constructor(public payload: Array<Topic>) { }
}
export class CollectionFulfilAction implements Action {
  readonly type = ActionTypes.COLLECTION_FULFIL;
  constructor(public payload: Array<Topic>) { }
}

export type Actions
  = SetFilterAction
  | SetPageCountAction
  | RecentTopicsFulfilAction
  | CollectionFulfilAction;
