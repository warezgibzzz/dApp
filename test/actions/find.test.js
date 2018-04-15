import { expect } from 'chai';
import sinon from 'sinon';

import { MarketContractRegistry, CollateralToken } from '../mocks/contracts';
import { findContract } from '../../src/actions/find';

describe('FindAction', () => {
  let contractParams;
  let contractAddress;
  let findParams;
  let dispatchSpy;

  function runFindContractAction() {
    const findContractAction = findContract(findParams, contractAddress, contractParams);
    return findContractAction(dispatchSpy);
  }

  beforeEach(() => {
    contractAddress = { marketContractAddress: '0x0000001' }; // dummy contract
    contractParams = { MarketContractRegistry: MarketContractRegistry(), CollateralToken: CollateralToken() };
    findParams = { processContracts: () => (Promise.resolve({})), web3: {} };
    dispatchSpy = sinon.spy();
  });

  it('should find and dispatch processed contracts as array of { name, value } objects', () => {
    findParams.processContracts = () => (Promise.resolve([{
        CONTRACT_NAME: 'UNIT/TEST',
        BASE_TOKEN: '0x12300',
      }]
    ));

    const expectedPayload = [
      { name: 'CONTRACT_NAME', value: 'UNIT/TEST'},
      { name: 'BASE_TOKEN', value: '0x12300'}
    ];

    return runFindContractAction()
      .then(() => {
        expect(dispatchSpy).to.have.property('callCount', 2);
        expect(dispatchSpy.args[0][0].type).to.equals('FIND_CONTRACT_PENDING');
        expect(dispatchSpy.args[1][0].type).to.equals('FIND_CONTRACT_FULFILLED');
        expect(dispatchSpy.args[1][0].payload).to.deep.equals(expectedPayload);
      });
  });

  it('should dispatch error if contract is not whitelisted', () => {
    Object.assign(contractParams.MarketContractRegistry.instance, {
      isAddressWhiteListed: (address) => (Promise.resolve(false))
    });

    return runFindContractAction()
    .catch(() => {
      expect(dispatchSpy).to.have.property('callCount', 2);
      expect(dispatchSpy.args[0][0].type).to.equals('FIND_CONTRACT_PENDING');
      expect(dispatchSpy.args[1][0].type).to.equals('FIND_CONTRACT_REJECTED');
    });
  });

  it('should dispatch loading and then error if web3 is undefined', () => {
    findParams.web3 = null;

    return runFindContractAction()
    .catch(() => {
      expect(dispatchSpy).to.have.property('callCount', 2);
      expect(dispatchSpy.args[0][0].type).to.equals('FIND_CONTRACT_PENDING');
      expect(dispatchSpy.args[1][0].type).to.equals('FIND_CONTRACT_REJECTED');
    });
  });

});
