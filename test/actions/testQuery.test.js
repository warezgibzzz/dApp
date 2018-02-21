import { expect } from 'chai';
import sinon from 'sinon';

import { testQuery } from '../../src/actions/testQuery';

describe('TestQueryAction', () => {

  it('should dispatch loading and then error if web3 is undefined', () => {
    const dispatchSpy = sinon.spy();
    const deployParams = {
      web3: null
    };
    const testQueryAction = testQuery(deployParams, {});
    testQueryAction(dispatchSpy);
    expect(dispatchSpy).to.have.property('callCount', 2);

    expect(dispatchSpy.args[0][0].type).to.equals('TEST_QUERY_PENDING');
    expect(dispatchSpy.args[1][0].type).to.equals('TEST_QUERY_REJECTED');
  });

});