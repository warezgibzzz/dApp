import { expect } from 'chai';

import simExchange from '../../src/reducers/simExchange';

describe('SimExchange Reducer', () => {
  const actions = {
    selectedContract: 'SELECTED_CONTRACT'
  };

  it('should return result state with SELECTED CONTRACT action', () => {
    const expectedContract = 'My contract';
    const newState = simExchange(
      {},
      { type: actions.selectedContract, payload: expectedContract }
    );
    expect(newState.contract).to.equal(expectedContract);
  });
});
