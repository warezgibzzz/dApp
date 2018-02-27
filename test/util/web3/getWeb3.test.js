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

  // helper to create a mock provider
  function getMockProvider() {
    const mockProvider = new FakeProvider();
    mockProvider.isMetaMask = true;
    // mockProvider.host = 'ws://remotenode.com:8546';
    return mockProvider;
  }

  // helper to setup window parameters
  function setupWindow({ provider, accounts }) {
    Object.assign(mockWindow, {
      web3: {
        currentProvider: provider,
        eth: { accounts },
      },
    });
  }

  it('should dispatch with web3.version.network as Truffle Develop Network', async () => {
    const truffleDevelopNetworkId = '4447';
    const expectedNetwork = 'truffle';
    const mockProvider = getMockProvider();
    mockProvider.injectResult(truffleDevelopNetworkId);
    setupWindow({ provider: mockProvider, accounts: [{}] });
    
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
    const mockProvider = getMockProvider();
    setupWindow({ provider: mockProvider, accounts: [{}] }); // accounts must not be empty

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const { payload } = dispatchCall.args[0];

    expect(payload).to.have.property('web3Instance');
    expect(payload).to.have.property('network');
  });

  it('should dispatch web3.currentProvider as web3Instance', async () => {
    const mockProvider = getMockProvider();
    setupWindow({ provider: mockProvider, accounts: [{}] }); // accounts must not be empty

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance.currentProvider).to.equals(mockProvider);
  });

  it('should show Error message when default provider is locked', async () => {
    const mockProvider = getMockProvider();
    setupWindow({ provider: mockProvider, accounts: [] }); // account is empty when locked

    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    expect(showErrorMessageSpy).to.have.property('callCount', 1);

    // dispatched web3Instance should be null too
    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance).to.equals(null);
  });

});
