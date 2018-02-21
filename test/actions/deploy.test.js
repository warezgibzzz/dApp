import { expect } from 'chai';
import sinon from 'sinon';

import { deployContract } from '../../src/actions/deploy';

describe('DeployAction', () => {

  it('should dispatch loading and then error if web3 is undefined', () => {
    const dispatchSpy = sinon.spy();
    const deployParams = {
      contractSpecs: {},
      web3: null
    };
    const deployAction = deployContract(deployParams, {});
    deployAction(dispatchSpy);
    expect(dispatchSpy).to.have.property('callCount', 2);

    expect(dispatchSpy.args[0][0].type).to.equals('DEPLOY_CONTRACT_PENDING');
    expect(dispatchSpy.args[1][0].type).to.equals('DEPLOY_CONTRACT_REJECTED');
  });

});