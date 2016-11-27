/*
 * The main (and only) @ngrx/store reducer for the application.
 * 
 * This implements the application's core logic by handling actions
 * and producing new versions of the immutable AppState record
 * based on those actions.
 */
import { ActionReducer, Action } from '@ngrx/store';
import { List, Range } from 'immutable';
import { AppStateRecord, appStateFactory } from 'app';
import { User } from 'app-models';
import { appAction } from 'app-actions';

// The reducer function. Receives actions and produces new application states.
export const appReducer: ActionReducer<AppStateRecord> = (state = makeInitialState(), action: appAction.Actions) => {

  switch (action.type) {
    case appAction.ActionTypes.LOGIN_SUCCESS: 
    case appAction.ActionTypes.REFRESH_SUCCESS: {
      const user = action.payload;
      return state.merge({ loggedIn: true, loggedInUser: user });
    }
    case appAction.ActionTypes.LOGIN_FAILED:
    case appAction.ActionTypes.REFRESH_FAILED:
    case appAction.ActionTypes.LOGOUT_USER: {
      return state.merge(makeInitialState());
    }
    default:
      return state;
  }
};

// Initial AppState, used to bootstrap the reducer.
function makeInitialState() {
  return appStateFactory({
    loggedIn: false,
    loggedInUser: null
  });
}
