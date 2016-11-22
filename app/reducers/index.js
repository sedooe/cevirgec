// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching as isDictionariesFetching } from './dictionary';
import { onlineSources, isFetching as isOnlineSourcesFetching } from './onlineSource';
import { user, isFetching as isUserFetching } from './user';

const rootReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    isFetching: isDictionariesFetching
  }),
  onlineSource: combineReducers({
    onlineSources,
    isFetching: isOnlineSourcesFetching
  }),
  user: combineReducers({
    user,
    isFetching: isUserFetching
  }),
  routing
});

export default rootReducer;
