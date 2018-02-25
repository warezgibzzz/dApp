import { expect } from 'chai';
import sinon from 'sinon';
import FakeProvider from 'web3-fake-provider';

import getWeb3 from '../../../src/util/web3/getWeb3';

const defaultProviderHost = 'http://127.0.0.1:9545';

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
  
  it('should call dispatch with localhost web3 instance if web3 provider does not exist', async () => {
    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);
    
    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    console.log('Current Provider', web3Instance.currentProvider.host);
    expect(web3Instance.currentProvider.host).to.equals(defaultProviderHost);
  });

  it('should dispatch web3.currentProvider as web3Instance', async () => {
    const mockProvider = new FakeProvider();

    mockProvider.isMetaMask = true;
    mockProvider.host = 'ws://remotenode.com:8546';

    Object.assign(mockWindow, {
      web3: {
        currentProvider: mockProvider,
        eth: { accounts: [ { } ] } // accounts must not be empty else it would show error 
      }
    });
    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance.currentProvider).to.equals(mockProvider);
  });

  it('should show Error message when default provider is locked', async () => {
    const mockProvider = new FakeProvider();

    mockProvider.isMetaMask = true;

    Object.assign(mockWindow, {
      web3: {
        currentProvider: mockProvider,
        eth: { accounts: [] }, // no accounts mean provider is locked.
        version: { network: '' },
      }
    });
    await getWeb3(mockWindow, showErrorMessageSpy, dispatchSpy);

    expect(showErrorMessageSpy).to.have.property('callCount', 1);

    // dispatched web3Instance should be null too
    const dispatchCall = dispatchSpy.getCall(0);
    const web3Instance = dispatchCall.args[0].payload.web3Instance;
    expect(web3Instance).to.equals(null);
  });

});
