import { expect } from 'chai';
import sinon from 'sinon';

import { MarketContractRegistry, CollateralToken } from '../mocks/contracts';
import { loadContracts } from '../../src/actions/explorer';

describe('ExplorerAction', () => {

  let contractParams;
  let deployParams;
  let dispatchSpy;

  function runLoadContractsAction() {
    const loadContractsAction = loadContracts(deployParams, contractParams);
    return loadContractsAction(dispatchSpy);
  }

  beforeEach(() => {
    contractParams = { MarketContractRegistry: MarketContractRegistry(), CollateralToken: CollateralToken() };
    deployParams = { processContracts: () => (Promise.resolve({})), web3: {} };
    dispatchSpy = sinon.spy();
  });

  it('should dispatch processed contracts', () => {
    const expectedPayload = [{
      CONTRACT_NAME: 'UNIT/TEST',
      BASE_TOKEN: '0x12300',
    }];
    deployParams.processContracts = () => (Promise.resolve(expectedPayload));

  return runLoadContractsAction()
    .then(() => {
      expect(dispatchSpy).to.have.property('callCount', 2);
      expect(dispatchSpy.args[0][0].type).to.equals('GET_CONTRACTS_PENDING');
      expect(dispatchSpy.args[1][0].type).to.equals('GET_CONTRACTS_FULFILLED');
      expect(dispatchSpy.args[1][0].payload).to.deep.equals(expectedPayload);
    });
  });

  it('should dispatch loading and then error if web3 is undefined', () => {
    deployParams.web3 = null;

    return runLoadContractsAction()
      .catch(() => {
        expect(dispatchSpy).to.have.property('callCount', 2);
        expect(dispatchSpy.args[0][0].type).to.equals('GET_CONTRACTS_PENDING');
        expect(dispatchSpy.args[1][0].type).to.equals('GET_CONTRACTS_REJECTED');
      });
  });

});