import { expect } from 'chai';
import sinon from 'sinon';
// import Web3 from 'web3';
// import FakeProvider from 'web3-fake-provider';

// import { MarketContract, OrderLib } from '../mocks/contracts';
import { selectContract } from '../../src/actions/simExchange';

/*function mockedCoinbaseWeb3(
  callbackError = null,
  coinbaseAddress = '0x123456'
) {
  const fakeProvider = new FakeProvider();
  const web3 = new Web3(fakeProvider);
  fakeProvider.injectResult(['0x98765']);
  web3.eth.getCoinbase = callback => {
    callback(callbackError, coinbaseAddress);
  };
  return web3;
}*/

describe('SimExchange Actions', () => {
  // let web3;
  let dispatchSpy;
  // let mockContracts;

  beforeEach(() => {
    // web3 = mockedCoinbaseWeb3();
    dispatchSpy = sinon.spy();
    // mockContracts = { MarketContract: MarketContract(), OrderLib: OrderLib() };
  });

  describe('select contract', () => {
    it('should dispatch selected contract', () => {
      const contract = '0x00001';
      const action = selectContract({ contract });

      action(dispatchSpy);

      expect(dispatchSpy).to.have.property('callCount', 1);
      expect(dispatchSpy.args[0][0].type).to.equals('SELECTED_CONTRACT');
      expect(dispatchSpy.args[0][0].payload).to.equals(contract);
    });
  });
});
