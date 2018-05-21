import { expect } from 'chai';

import find from '../../src/reducers/find';

describe('Find Reducer', () => {
  const actions = {
    pending: 'FIND_CONTRACT_PENDING',
    fulfilled: 'FIND_CONTRACT_FULFILLED',
    rejected: 'FIND_CONTRACT_REJECTED'
  };

  it('should return loading state with PENDING action', () => {
    const newState = find({}, { type: actions.pending });
    expect(newState.loading).to.equal(true);
    expect(newState.error).to.equal(null);
  });

  it('should return contract data with FULFILLED action', () => {
    const expectedResult = 'Result of query';
    const newState = find(
      {},
      { type: actions.fulfilled, payload: expectedResult }
    );
    expect(newState.contract).to.equal(expectedResult);
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(null);
  });

  it('should return error state with REJECT action', () => {
    const expectedError = new Error('error');
    const newState = find(
      {},
      { type: actions.rejected, payload: expectedError }
    );
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(expectedError);
  });
});
