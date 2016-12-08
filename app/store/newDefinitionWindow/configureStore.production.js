// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import newDefinitionWindowReducer from '../../reducers/newDefinitionWindow';

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState: Object) {
  return createStore(newDefinitionWindowReducer, initialState, enhancer);
}
