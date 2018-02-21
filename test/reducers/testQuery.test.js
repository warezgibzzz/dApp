import React from 'react';
import { expect } from 'chai';

import testQuery from '../../src/reducers/testQuery';

describe('TestQuery Reducer', () => {
  const actions = {
    pending: 'TEST_QUERY_PENDING',
    fulfilled: 'TEST_QUERY_FULFILLED',
    rejected: 'TEST_QUERY_REJECTED',
  };

  it('should return loading state with PENDING action', () => {
    const newState = testQuery({}, { type: actions.pending });
    expect(newState.loading).to.equal(true);
    expect(newState.error).to.equal(null);
  });

  it('should return result state with FULFILLED action', () => {
    const expectedResult = 'Result of query';
    const newState = testQuery({}, { type: actions.fulfilled, payload: expectedResult });
    expect(newState.results).to.equal(expectedResult);
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(null);
  });

  it('should return error state with REJECT action', () => {
    const expectedError = new Error('error');
    const newState = testQuery({}, { type: actions.rejected, payload: expectedError });
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(expectedError);
  });
});