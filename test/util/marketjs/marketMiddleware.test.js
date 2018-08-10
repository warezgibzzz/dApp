import { expect } from 'chai';
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import moment from 'moment';
import BigNumber from 'bignumber.js';

import initializeMarket from '../../../src/util/marketjs/initializeMarket';
import { MarketJS } from '../../../src/util/marketjs/marketMiddleware';

describe('marketMiddleware', () => {
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
  const mockContract = {
    contract: { key: '0x6467854f25ff1f1ff8c11a717faf03e409b53635' },
    CONTRACT_NAME: 'ETHXBT',
    COLLATERAL_TOKEN: 'FakeDollars',
    COLLATERAL_TOKEN_ADDRESS: '0x6467854f25ff1f1ff8c11a717faf03e409b53635',
    COLLATERAL_TOKEN_SYMBOL: 'FUSD',
    MARKET_COLLATERAL_POOL_ADDRESS: new BigNumber(),
    PRICE_FLOOR: '60465',
    PRICE_CAP: '20155',
    PRICE_DECIMAL_PLACES: '2',
    QTY_MULTIPLIER: '10',
    ORACLE_QUERY:
      'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.c.0',
    EXPIRATION: '',
    lastPrice: '105700',
    isSettled: true,
    collateralPoolBalance: ''
  };
  const web3 = {
    network: 'rinkeby',
    networkId: 4,
    web3Instance: mockedWeb3()
  };
  const initialState = {
    web3: web3,
    simExchange: mockContract,
    marketjs: initializeMarket(web3).then(action => {
      return action.payload;
    })
  };
  const middlewares = [];
  const storeConfig = configureStore(middlewares);
  const mockStore = storeConfig(initialState);
  const signedOrderJSON =
    '{"contractAddress":"0xbf964e14ea2ac27a957f76b7cd58f4c47f1","expirationTimestamp":"1536427685","feeRecipient":"0x0000000000000000000000000000000000000000","maker":"0xce5fdef0592271c41c4ac07ddb52ae3bbb3fcb9e","makerFee":"0","orderQty":"1","price":"1","remainingQty":"1","salt":"1","taker":"0x0000000000000000000000000000000000000000","takerFee":"0","ecSignature":{"v":27,"r":"0x0d8d8977bd5c68f7b39ef7a35cc35557d2e465d1c22d22ea1ddcc24787cb","s":"0x253bd6cf6bedc81fcacb476b64435552721e511c175c1cd43a0cbe6a7e"}}';
  const orderTransactionInfo = {};

  describe('createSignedOrderAsync', () => {
    it('should create a signed order', () => {
      mockStore.getState().marketjs.then(marketjs => {
        const spy = sinon.spy(MarketJS, 'createSignedOrderAsync');
        const marketStub = sinon.stub(marketjs, 'createSignedOrderAsync');

        marketStub.returns(signedOrderJSON);

        const orderData = {
          expirationTimestamp: '1536427685',
          qty: '1',
          price: '1'
        };

        MarketJS.createSignedOrderAsync(orderData, mockStore);

        expect(spy.alwaysReturned(signedOrderJSON)).to.equal(true);
      });
    });
  });

  describe('depositCollateralAsync', () => {
    it('should deposit availlableCollateral to a MARKET contract', () => {});
  });

  describe('getUserAccountBalanceAsync', () => {
    it('should return a users unallocatedCollateral as a string', () => {
      mockStore.getState().marketjs.then(async marketjs => {
        let spy = sinon.spy(MarketJS, 'getUserAccountBalanceAsync');
        sinon
          .stub(marketjs, 'getUserAccountBalanceAsync')
          .callsFake(function then() {
            return '1.000000000000000000';
          });

        await MarketJS.getUserAccountBalanceAsync(
          mockContract.contract,
          true,
          mockStore
        );

        expect(spy.alwaysReturned('1.000000000000000000')).to.equal(true);
      });
    });
  });

  describe('tradeOrderAsync', () => {
    it('should fill an order using a signedOrderJSON string', () => {
      mockStore.getState().marketjs.then(marketjs => {
        const spy = sinon.spy(MarketJS, 'tradeOrderAsync');
        const marketStub = sinon.stub(marketjs, 'tradeOrderAsync');

        marketStub.resolves(
          new Promise(resolve => {
            resolve(orderTransactionInfo);
          })
        );

        MarketJS.tradeOrderAsync(signedOrderJSON, mockStore);

        expect(spy.alwaysReturned(orderTransactionInfo)).to.equal(true);
      });
    });
  });

  describe('withdrawCollateralAsync', () => {
    it('should withdraw unallocatedCollateral from a MARKET contract', () => {});
  });
});
