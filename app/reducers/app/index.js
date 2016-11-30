// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import isFetching from '../isFetching';
import dictionaries from '../dictionary';
import onlineSources from '../onlineSource';
import user from './user';

const appReducer = combineReducers({
  dictionaries,
  onlineSources,
  user,
  isFetching,
  routing
});

export default appReducer;
