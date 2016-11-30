// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import isFetching from '../isFetching';
import dictionaries from '../dictionary';
import onlineSources from '../onlineSource';
import activeDictionaries from './activeDictionaries';
import wordAndDefinitions from './wordAndDefinitions';

const newDefinitionWindowReducer = combineReducers({
  dictionaries: combineReducers({
    dictionaries,
    activeDictionaries
  }),
  onlineSources,
  wordAndDefinitions,
  isFetching,
  routing
});

export default newDefinitionWindowReducer;
