import { expect } from 'chai';
import sinon from 'sinon';

import { loadContracts } from '../../src/actions/explorer';

describe('ExplorerAction', () => {

  it('should dispatch loading and then error if web3 is undefined', () => {
    const dispatchSpy = sinon.spy();
    const deployParams = {
      web3: null
    };
    const loadContractAction = loadContracts(deployParams, {});
    loadContractAction(dispatchSpy);
    expect(dispatchSpy).to.have.property('callCount', 2);

    expect(dispatchSpy.args[0][0].type).to.equals('GET_CONTRACTS_PENDING');
    expect(dispatchSpy.args[1][0].type).to.equals('GET_CONTRACTS_REJECTED');
  });

});