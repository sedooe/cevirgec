// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching as isDictionaryFetching } from '../dictionary';
import { onlineSources, isFetching as isOnlineSourceFetching } from '../onlineSource';
import { user, isFetching as isUserFetching } from './user';
import { study, isFetching as isStudyFetching } from './study';

const appReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    isDictionaryFetching
  }),
  onlineSource: combineReducers({
    onlineSources,
    isOnlineSourceFetching
  }),
  user: combineReducers({
    user,
    isUserFetching
  }),
  study: combineReducers({
    study,
    isStudyFetching
  }),
  routing
});

export default appReducer;
