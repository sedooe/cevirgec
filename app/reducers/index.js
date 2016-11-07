// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching } from './dictionary';

const rootReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    isFetching
  }),
  routing
});

export default rootReducer;
