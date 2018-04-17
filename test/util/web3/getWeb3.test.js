import { expect } from 'chai';
import sinon from 'sinon';
import FakeProvider from 'web3-fake-provider';

import getWeb3 from '../../../src/util/web3/getWeb3';



describe('getWeb3', () => {
  let dispatchSpy;
  let showErrorMessageSpy;
  let mockWindow;
  beforeEach(() => {
    dispatchSpy = sinon.spy();
    showErrorMessageSpy = sinon.spy();
    mockWindow = {
      addEventListener(event, cb) {
        if (event === 'load') { cb(); }
      },
    };
  });

  function mockedWeb3(callbackError = null, coinbaseAddress = '0x123456', accounts = ['0x0000001']) {
    const fakeProvider = new FakeProvider();
    const web3 = new Web3(fakeProvider);
    fakeProvider.injectResult(accounts);
    web3.eth.getCoinbase = (callback) => { callback(callbackError, coinbaseAddress); };
    web3.eth.getAccounts = (callback) => { callback(callbackError, accounts); };
    web3.eth.getNetwork = (callback) => { callback(callbackError, '4447'); };
    web3.currentProvider.isMetaMask = true;
    return web3;
  }

  // helper to setup window parameters
  function setupWindow(web3Instance) {
    Object.assign(mockWindow, {
      web3: web3Instance,
    });
  }

  it('should dispatch with web3.version.network as Truffle Develop Network', async () => {
    const expectedNetwork = 'truffle';

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const actualNetwork = dispatchCall.args[0].payload.network;
    expect(actualNetwork).to.equals(expectedNetwork);
  });

  it('should fallback to default web3 provider if web3 provider does not exist', async () => {
    const defaultProviderHost = 'http://127.0.0.1:9545';
    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance.currentProvider.host).to.equals(defaultProviderHost);
  });

  it('should have proper results', async () => {
    const web3 = mockedWeb3();
    setupWindow(web3); // accounts must not be empty

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const { payload } = dispatchCall.args[0];

    expect(payload).to.have.property('web3Instance');
    expect(payload).to.have.property('network');
  });

  it('should dispatch web3 as web3Instance', async () => {
    const web3 = mockedWeb3();
    setupWindow(web3);

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance).to.have.property('currentProvider');
  });

  it('should show Error message when default provider is locked', async () => {
    const web3 = mockedWeb3(null, '0x123456', []);
    setupWindow(web3); // account is empty when locked

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    expect(showErrorMessageSpy).to.have.property('callCount', 1);

    // dispatched web3Instance should be null too
    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance).to.equals(null);
  });

});
