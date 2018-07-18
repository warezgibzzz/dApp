import { expect } from 'chai';
import sinon from 'sinon';
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';

import initializeMarket from '../../../src/util/marketjs/initializeMarket';
import marketjsInitialized from '../../../src/util/marketjs/initializeMarket';
import { Market } from '@marketprotocol/marketjs';
import showMessage from '../../../src/components/message';
import configureStore from 'redux-mock-store';

describe('initializeMarket', () => {
  let dispatchSpy;
  let showErrorMessageSpy;
  let mockWindow;

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    showErrorMessageSpy = sinon.spy();
    mockWindow = {
      addEventListener(event, cb) {
        if (event === 'load') {
          cb();
        }
      }
    };
  });

  function mockedWeb3(
    callbackError = null,
    coinbaseAddress = '0x123456',
    accounts = ['0x0000001']
  ) {
    const fakeProvider = new FakeProvider();
    const web3 = new Web3(fakeProvider);
    fakeProvider.injectResult(accounts);
    web3.eth.getCoinbase = callback => {
      callback(callbackError, coinbaseAddress);
    };
    web3.eth.getAccounts = callback => {
      callback(callbackError, accounts);
    };
    web3.version.getNetwork = callback => {
      callback(callbackError, '4447');
    };
    web3.currentProvider.isMetaMask = true;
    return web3;
  }

  // helper to setup window parameters
  function setupWindow(web3Instance) {
    Object.assign(mockWindow, {
      web3: web3Instance
    });
  }

  it('should initialize MARKET.js', async () => {
    const web3 = mockedWeb3();
    const initialState = {
      web3: {
        web3Instance: web3
      }
    };

    const mockStore = configureStore();
    const store = mockStore(initialState);

    initializeMarket();
    await Promise.resolve();
    store.dispatch({
      type: 'MARKETJS_INITIALIZED',
      payload: new Market(web3.currentProvider, { networkId: 4 })
    });
  });
});
