// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { dictionaries, isFetching } from './dictionary';
import user from './user';

const rootReducer = combineReducers({
  dictionary: combineReducers({
    dictionaries,
    isFetching
  }),
  user,
  routing
});

export default rootReducer;
