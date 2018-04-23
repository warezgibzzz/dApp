import { expect } from 'chai';

import { getMetamaskError } from '../../src/util/utils';

describe('getMetamaskError', () => {

  it('should return "User denied transaction" for declined MetaMask transactions', async () => {
    const expectedErrorMessage = 'User denied transaction';

    const actualErrorMessage =
      getMetamaskError('Error: MetaMask Tx Signature: User denied transaction signature.');

    expect(actualErrorMessage).to.equals(expectedErrorMessage);
  });

  it('should return original error message as a fallback', async () => {
    const expectedErrorMessage = 'Error: MetaMask Tx Signature: User denied signature.';

    const actualErrorMessage =
      getMetamaskError('Error: MetaMask Tx Signature: User denied signature.');

    expect(actualErrorMessage).to.equals(expectedErrorMessage);
  });

})
