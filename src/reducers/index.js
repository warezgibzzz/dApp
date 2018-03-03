import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import web3Reducer from '../util/web3/web3Reducer';

import find from './find';
import deploy from './deploy';
import explorer from './explorer';
import testQuery from './testQuery';

export default combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  find: find,
  deploy: deploy,
  explorer: explorer,
  testQuery: testQuery,
});
