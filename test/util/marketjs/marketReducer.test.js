import { expect } from 'chai';

import { MARKETJS_INITIALIZED } from '../../../src/util/marketjs/initializeMarket';
import marketReducer from '../../../src/util/marketjs/marketReducer';

describe('marketReducer', () => {
  it('should update state with market.js instance when action MARKETJS_INITIALIZED is recieived', async () => {
    const newState = marketReducer(
      {},
      {
        type: MARKETJS_INITIALIZED,
        payload: { marketjs: 'loaded' }
      }
    );

    expect(newState.marketjs).to.equals('loaded');
  });
});
