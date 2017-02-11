import '@ngrx/core/add/operator/select';

import * as fromApi from './api';
import * as fromApp from './app';
import * as fromAuth from './auth';
import * as fromContent from './content';
import * as fromRouter from '@ngrx/router-store';
import * as fromTopic from './topic';
import * as fromUser from './user';
import * as fromYard from './yard';

import { ActionReducer } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
    app: fromApp.State;
    auth: fromAuth.State;
    api: fromApi.State;
    yard: fromYard.State;
    topic: fromTopic.State;
    router: fromRouter.RouterState;
    // content
    category: fromContent.category.State;
    promotion: fromContent.promotion.State;
    // user
    role: fromUser.role.State;
};

const reducers = {
    app: fromApp.reducer,
    auth: fromAuth.reducer,
    api: fromApi.reducer,
    yard: fromYard.reducer,
    topic: fromTopic.reducer,
    router: fromRouter.routerReducer,
    // content
    category: fromContent.category.reducer,
    promotion: fromContent.promotion.reducer,
    // user
    role: fromUser.role.reducer,
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

// export function getContent(state$: Observable<State>) {
//     return state$.select(state => state.content)
// }

export function getCateState(state$: Observable<State>) {
    return state$.select(state => state.category);
}
export function getPromState(state$: Observable<State>) {
    return state$.select(state => state.promotion);
}
// user
export function getRoleState(state$: Observable<State>){
    return state$.select(state => state.role);
}

// App selector
export const getCurrentUser = compose(fromApp.getCurrentUser, getAppState);
export const getCurrentRoles = compose(fromApp.getCurrentRoles, getAppState);
export const getSettingFilter = compose(fromApp.getSettingFilter, getAppState);


// Auth selector
export const getIsLogging = compose(fromAuth.getIsLogging, getAuthState);
export const getIsLogged = compose(fromAuth.getIsLoggedIn, getAuthState);

// Api selector
export const getFailedActions = compose(fromApi.getFailedActions, getApiState);
export const getHasRetried = compose(fromApi.getHasRetried, getApiState);
export const getRequestBusying = compose(fromApi.getIsBusy, getApiState);

// Yard selector
export const getToolbarTitle = compose(fromYard.getTitle, getYardState);

// content
const getCategories = compose(fromContent.category.getCategories, getCateState);
const getPromotions = compose(fromContent.promotion.getPromotions, getPromState);
export const content = {
    getCategories,
    getPromotions,
};
// user
const getRoles = compose(fromUser.role.getRoles, getRoleState);
export const user = {
    getRoles,
};


// topic selector
export const getTopicCollection = compose(fromTopic.getCollection, getTopicState);
export const getRecentTopics = compose(fromTopic.getRecentTopics, getTopicState);
export const getCurrentFilter = compose(fromTopic.getCurrentFilter, getTopicState);
export const getPageCount = compose(fromTopic.getPageCount, getTopicState);
