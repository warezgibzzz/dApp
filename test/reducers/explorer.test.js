import React from 'react';
import { expect } from 'chai';

import explorer from '../../src/reducers/explorer';

describe('Explorer Reducer', () => {
  const actions = {
    pending: 'GET_CONTRACTS_PENDING',
    fulfilled: 'GET_CONTRACTS_FULFILLED',
    rejected: 'GET_CONTRACTS_REJECTED',
  };

  it('should return loading state with PENDING action', () => {
    const newState = explorer({}, { type: actions.pending });
    expect(newState.loading).to.equal(true);
    expect(newState.error).to.equal(null);
  });

  it('should return contracts state with FULFILLED action', () => {
    const expectedResult = 'Result of query';
    const newState = explorer({}, { type: actions.fulfilled, payload: expectedResult });
    expect(newState.contracts).to.equal(expectedResult);
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(null);
  });

  it('should return error state with REJECT action', () => {
    const expectedError = new Error('error');
    const newState = explorer({}, { type: actions.rejected, payload: expectedError });
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(expectedError);
  });
});