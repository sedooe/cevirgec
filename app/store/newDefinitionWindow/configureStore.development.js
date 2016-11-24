import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import newDefinitionWindowReducer from '../../reducers/newDefinitionWindow';

import * as dictionaryActions from '../../actions/dictionary';

const actionCreators = {
  ...dictionaryActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

const enhancer = compose(
  applyMiddleware(thunk, router, logger),
  window.devToolsExtension ?
    window.devToolsExtension({ actionCreators }) :
    noop => noop
);

export default function configureStore(initialState: Object) {
  const store = createStore(newDefinitionWindowReducer, initialState, enhancer);

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    module.hot.accept('../../reducers/newDefinitionWindow', () =>
      store.replaceReducer(require('../../reducers/newDefinitionWindow')) // eslint-disable-line global-require
    );
  }

  return store;
}
