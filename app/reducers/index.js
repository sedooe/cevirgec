// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import dictionary from './dictionary';

const rootReducer = combineReducers({
  dictionary,
  routing
});

export default rootReducer;
