// @flow
import * as actions from '../../actions/constants/settings';

export function settings(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.ALL_SETTINGS_LOADED: // action.data: settings object
      return action.data;
    case actions.VERBOSITY_CHANGED: // action.data: toggle checked, boolean
      return {...state, verbose: action.data };
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_LOAD_ALL_SETTINGS:
    case actions.REQUEST_CHANGE_VERBOSITY:
      return true;
    case actions.ALL_SETTINGS_LOADED:
    case actions.VERBOSITY_CHANGED:
      return false;
    default:
      return state;
  }
}
