import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Splash from './Splash';
import store, { history } from './store';
import getWeb3 from './util/web3/getWeb3';

// Display Splash until web3 is initialized
ReactDOM.render(
  <Splash alt='Initializing Web3...' />,
  document.getElementById('dapp')
);

// Initialize web3 and set in Redux
getWeb3(window)
  .then(results => {
    ReactDOM.render(
      <Provider store={store}>
        <App history={history} />
      </Provider>,
      document.getElementById('dapp')
    );
  })
  .catch(() => {
    console.log('Error in web3 initialization.');
  });
