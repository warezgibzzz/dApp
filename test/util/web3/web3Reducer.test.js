import { expect } from 'chai';
import sinon from 'sinon';

import { WEB3_INITIALIZED } from '../../../src/util/web3/getWeb3';
import web3Reducer from '../../../src/util/web3/web3Reducer';



describe('Web3Reducer', () => {
  it('should update state with web3Instance when action WEB3_INITIALIZED is recieived', async () => {
    const expectedWeb3Instance = { host: 'https://localhost:8485' };
    const newState = web3Reducer({}, {
      type: WEB3_INITIALIZED,
      payload: { web3Instance: expectedWeb3Instance }
    });

    expect(newState.web3Instance).to.equals(expectedWeb3Instance);
  });

});