// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching as isDictionaryFetching } from '../dictionary';
import { onlineSources, isFetching as isOnlineSourceFetching } from '../onlineSource';
import { user, isFetching as isUserFetching } from './user';
import { settings, isFetching as isSettingsFetching } from './settings';
import { study, isFetching as isStudyFetching } from './study';
import { quiz, isFetching as isQuizFetching } from './quiz';

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
  settings: combineReducers({
    settings,
    isSettingsFetching
  }),
  study: combineReducers({
    study,
    isStudyFetching
  }),
  quiz: combineReducers({
    quiz,
    isQuizFetching
  }),
  routing
});

export default appReducer;
