// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { activeDictionaries, dictionaries, isFetching as isDictionariesFetching } from './dictionary';

const newDefinitionWindowReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    isFetching: isDictionariesFetching,
    activeDictionaries
  }),
  routing
});

export default newDefinitionWindowReducer;
