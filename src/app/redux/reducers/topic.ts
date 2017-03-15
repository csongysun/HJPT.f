import { Action, ActionReducer } from '@ngrx/store';
import { Topic, TopicFilter } from '@app/models';

import { Observable } from 'rxjs/Observable';
import { topicAction } from '@app/redux/actions';

export interface State {
    filter: TopicFilter,
    pageCount: number,
    recent: Array<Topic>
    collection: Array<Topic>
}
const initialState: State = {
    filter: defaultFilter(),
    pageCount: 0,
    recent: [],
    collection: []
};

function defaultFilter(): TopicFilter {
    let pts = localStorage.getItem('setting_pageTake');
    let filter = new TopicFilter();
    filter.pageIndex = 1;
    filter.pageTake = pts ? parseInt(pts) : 50;
    filter.categoryIds = defaultCateIds();
    return filter;
}

function defaultCateIds(): Array<number> {
    let cid = localStorage.getItem('setting_categoryIds');
    if (!cid) return null;
    let cids = cid.split(',');
    if (cids.length < 1) return null;
    return cids.map((item) => parseInt(item));
}

export const reducer: ActionReducer<State> = (state = initialState, action: topicAction.Actions) => {
    switch (action.type) {
        case topicAction.ActionTypes.SET_FILTER: {
            const filter = action.payload ? action.payload : defaultFilter();
            //也许没用
            filter.pageIndex = filter.pageIndex > state.pageCount ? state.pageCount : filter.pageIndex;
            return Object.assign({}, state, { filter: filter });
        }
        case topicAction.ActionTypes.SET_PAGE_COUNT: {
            return Object.assign({}, state, { pageCount: action.payload })
        }
        case topicAction.ActionTypes.RECENT_FULFIL: {
            return Object.assign({}, state, { recent: action.payload });
        }
        case topicAction.ActionTypes.COLLECTION_FULFIL: {
            return Object.assign({}, state, { collection: action.payload });
        }
        default:
            return state;
    }
};

export function getRecentTopics(state$: Observable<State>) {
    return state$.select(state => state.recent);
}
export function getCollection(state$: Observable<State>) {
    return state$.select(state => state.collection);
}
export function getCurrentFilter(state$: Observable<State>) {
    return state$.select(state => state.filter);
}
export function getPageCount(state$: Observable<State>) {
    return state$.select(state => state.pageCount);
}
