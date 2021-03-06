// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import appReducer from '../../reducers/app';

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState: Object) {
  return createStore(appReducer, initialState, enhancer);
}
