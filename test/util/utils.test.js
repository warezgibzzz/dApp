import { expect } from 'chai';

import { dAppErrorMessage } from '../../src/util/utils';

describe('dAppErrorMessage', () => {

  it('should return "User denied transaction" for declined MetaMask transactions', async () => {
    const expectedErrorMessage = 'User denied transaction';

    const actualErrorMessage =
      dAppErrorMessage('Error: MetaMask Tx Signature: User denied transaction signature.');

    expect(actualErrorMessage).to.equals(expectedErrorMessage);
  });

  it('should return original error message as a fallback', async () => {
    const expectedErrorMessage = 'Error: MetaMask Tx Signature: User denied signature.';

    const actualErrorMessage =
      dAppErrorMessage('Error: MetaMask Tx Signature: User denied signature.');

    expect(actualErrorMessage).to.equals(expectedErrorMessage);
  });

})
