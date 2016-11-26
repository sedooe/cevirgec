// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching as isDictionariesFetching } from '../app/dictionary';
import { onlineSources, isFetching as isOnlineSourcesFetching } from '../app/onlineSource';
import { activeDictionaries } from './activeDictionaries';

const newDefinitionWindowReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    isFetching: isDictionariesFetching,
    activeDictionaries
  }),
  onlineSource: combineReducers({
    onlineSources,
    isFetching: isOnlineSourcesFetching
  }),
  routing
});

export default newDefinitionWindowReducer;
