import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';

export const history = createHistory();

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

// Middlewares
const middlewares = [thunk, historyMiddleware];

// Redux Logger
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
