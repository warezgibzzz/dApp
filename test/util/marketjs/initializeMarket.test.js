import { expect } from 'chai';
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';

import initializeMarket, {
  MARKETJS_INITIALIZED
} from '../../../src/util/marketjs/initializeMarket';

describe('initializeMarket', () => {
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
      callback(callbackError, '4');
    };
    web3.currentProvider.isMetaMask = true;
    return web3;
  }

  it('should initialize MARKET.js', async () => {
    const web3 = {
      network: 'rinkeby',
      networkId: 4,
      web3Instance: mockedWeb3()
    };

    initializeMarket(web3).then(action => {
      expect(action.type).to.equal(MARKETJS_INITIALIZED);
    });
  });
});
