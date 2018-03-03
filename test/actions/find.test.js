import { expect } from 'chai';
import sinon from 'sinon';

import { findContract } from '../../src/actions/find';

describe('FindAction', () => {

  it('should dispatch loading and then error if web3 is undefined', () => {
    const dispatchSpy = sinon.spy();
    const findParams = {
      web3: null
    };
    const findAction = findContract(findParams, "0x12345678123456781234567812345678", {});
    findAction(dispatchSpy);
    expect(dispatchSpy).to.have.property('callCount', 2);

    expect(dispatchSpy.args[0][0].type).to.equals('FIND_CONTRACT_PENDING');
    expect(dispatchSpy.args[1][0].type).to.equals('FIND_CONTRACT_REJECTED');
  });

});
