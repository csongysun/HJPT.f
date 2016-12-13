import { Observable } from 'rxjs/Observable';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from 'environments/environment';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromApp from './app';
import * as fromAuth from './auth';
import * as fromApi from './api';
import * as fromYard from './yard';
import * as fromTopic from './topic';

export interface State {
    app: fromApp.State,
    auth: fromAuth.State,
    api: fromApi.State,
    yard: fromYard.State,
    topic: fromTopic.State,
    router: fromRouter.RouterState
};

const reducers = {
    app: fromApp.reducer,
    auth: fromAuth.reducer,
    api: fromApi.reducer,
    yard: fromYard.reducer,
    topic: fromTopic.reducer,
    router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}

export function getAppState(state$: Observable<State>) {
    return state$.select(state => state.app);
}
export function getAuthState(state$: Observable<State>) {
    return state$.select(state => state.auth);
}
export function getApiState(state$: Observable<State>) {
    return state$.select(state => state.api);
}
export function getYardState(state$: Observable<State>) {
    return state$.select(state => state.yard);
}
export function getTopicState(state$: Observable<State>) {
    return state$.select(state => state.topic);
}

//App selector
export const getCurrentUser = compose(fromApp.getCurrentUser, getAppState);
export const getSettingFilter = compose(fromApp.getSettingFilter, getAppState);

//Auth selector
export const getIsLogging = compose(fromAuth.getIsLogging, getAuthState);
export const getIsLogged = compose(fromAuth.getIsLoggedIn, getAuthState);

//Api selector
export const getFailedActions = compose(fromApi.getFailedActions, getApiState);
export const getHasRetried = compose(fromApi.getHasRetried, getApiState);

//Yard selector
export const getToolbarTitle = compose(fromYard.getTitle, getYardState);
export const getCategories = compose(fromYard.getCategories, getYardState);

//topic selector
export const getTopicCollection = compose(fromTopic.getCollection, getTopicState);
export const getRecentTopics = compose(fromTopic.getRecentTopics, getTopicState);
export const getCurrentFilter = compose(fromTopic.getCurrentFilter, getTopicState);
export const getPageCount = compose(fromTopic.getPageCount, getTopicState);
