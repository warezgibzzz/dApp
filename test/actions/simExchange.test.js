import { expect } from 'chai';
import sinon from 'sinon';

import { selectContract } from '../../src/actions/simExchange';

describe('SelectContract', () => {
  it('should dispatch selected contract', () => {
    const expectedContract = '0x00001';
    const dispatchSpy = sinon.stub();
    const selectContractAction = selectContract(expectedContract);

    selectContractAction(dispatchSpy);

    expect(dispatchSpy).to.have.property('callCount', 1);
    expect(dispatchSpy.args[0][0].type).to.equals('SELECTED_CONTRACT');
    expect(dispatchSpy.args[0][0].payload).to.equals(expectedContract);
  });
});