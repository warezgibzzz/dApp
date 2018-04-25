import { expect } from 'chai';
import sinon from 'sinon';

import FormValidators from '../../../src/util/forms/Validators';

describe('FormValidators', () => {

  describe('ethAddressValidator', () => {
    it('should invoke callback() with no argument if web3 is not provided', () => {
      const callbackSpy = sinon.spy();

      FormValidators().ethAddressValidator({}, '', callbackSpy);

      expect(callbackSpy).to.have.property('callCount', 1);
      expect(callbackSpy.getCall(0).args[0]).to.equal(undefined); // valid
    });

    it('should invoke callback() with message if address is invalid', () => {
      const callbackSpy = sinon.spy();
      const mockWeb3 = { isAddress: (any) => false };

      FormValidators(mockWeb3).ethAddressValidator({}, '0xdf', callbackSpy);

      expect(callbackSpy).to.have.property('callCount', 1);
      expect(callbackSpy.getCall(0).args[0]).to.equal('Invalid ETH address'); // invalid
    });

    it('should invoke callback() with no argument if address is valid', () => {
      const callbackSpy = sinon.spy();
      const mockWeb3 = { isAddress: (any) => true };

      FormValidators(mockWeb3).ethAddressValidator({}, '0x00003', callbackSpy);

      expect(callbackSpy).to.have.property('callCount', 1);
      expect(callbackSpy.getCall(0).args[0]).to.equal(undefined); // valid
    });
  });
});