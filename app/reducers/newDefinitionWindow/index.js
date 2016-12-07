// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching as isDictionaryFetching } from '../dictionary';
import { onlineSources, isFetching as isOnlineSourceFetching } from '../onlineSource';
import activeDictionaries from './activeDictionaries';
import { wordAndDefinitions, isFetching as isWordAndDefinitionsFetching } from './wordAndDefinitions';

const newDefinitionWindowReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    activeDictionaries,
    isDictionaryFetching
  }),
  onlineSource: combineReducers({
    onlineSources,
    isOnlineSourceFetching
  }),
  wordAndDefinitions: combineReducers({
    wordAndDefinitions,
    isWordAndDefinitionsFetching
  }),
  routing
});

export default newDefinitionWindowReducer;
