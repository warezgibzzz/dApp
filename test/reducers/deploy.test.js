import { expect } from 'chai';

import deploy from '../../src/reducers/deploy';

describe('Deploy Reducer', () => {
  const actions = {
    pending: 'DEPLOY_CONTRACT_PENDING',
    fulfilled: 'DEPLOY_CONTRACT_FULFILLED',
    rejected: 'DEPLOY_CONTRACT_REJECTED'
  };

  it('should return loading state with PENDING action', () => {
    const newState = deploy({}, { type: actions.pending });
    expect(newState.loading).to.equal(true);
    expect(newState.error).to.equal(null);
  });

  it('should return contract state with FULFILLED action', () => {
    const expectedResult = 'Result of query';
    const newState = deploy(
      {},
      { type: actions.fulfilled, payload: expectedResult }
    );
    expect(newState.contract).to.equal(expectedResult);
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(null);
  });

  it('should return error state with REJECT action', () => {
    const expectedError = new Error('error');
    const newState = deploy(
      {},
      { type: actions.rejected, payload: expectedError }
    );
    expect(newState.loading).to.equal(false);
    expect(newState.error).to.equal(expectedError);
  });
});
