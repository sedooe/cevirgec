// @flow
import * as actions from '../actions/constants';

export function onlineSources(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.ONLINE_SOURCES_LOADED: { //action.data: onlineSources
      debugger
      const onlineSources = {};
      action.data.forEach(onlineSource => {
        onlineSources[onlineSource.id] = onlineSource;
      });
      return onlineSources;
    }
    case actions.ONLINE_SOURCE_CREATED:
    case actions.ONLINE_SOURCE_EDITED: { //action.data: onlineSource
      debugger
      const id = action.data.id;
      return {...state, [id]: action.data };
    }
    case actions.ONLINE_SOURCE_ACTIVENESS_CHANGED: { //action.data: onlineSourceId
      const id = action.data;
      return {...state, [id]: {...state[id], active: !state[id].active }};
    }
    case actions.ONLINE_SOURCE_DELETED: { //action.data: onlineSourceId
      const newState = Object.assign({}, state);
      delete newState[action.data];
      return Object.assign({}, newState);
    }
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_UPSERT_ONLINE_SOURCE:
    case actions.REQUEST_DELETE_ONLINE_SOURCE:
    case actions.REQUEST_CHANGE_ACTIVENESS_OF_ONLINE_SOURCE:
    case actions.REQUEST_LOAD_DICTIONARIES:
      return true;
    case actions.ONLINE_SOURCE_CREATED:
    case actions.ONLINE_SOURCE_DELETED:
    case actions.ONLINE_SOURCE_EDITED:
    case actions.ONLINE_SOURCE_ACTIVENESS_CHANGED:
    case actions.DICTIONARIES_LOADED:
      return false;
    default:
      return state;
  }
}
