import { expect } from 'chai';
import Web3 from 'web3';

import { checkContract } from "../../src/util/validations";


const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));


describe('CheckContractAction', () => {

  it('should validate contract based on the valid address provided', () => {
    const address = '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6'; // Market Token Address 
    checkContract(web3, address, function(result) {
      expect(result).to.equals(undefined);
    });
  });

  it('should invalidate the contract based on the invalid address provided', () => {
    const address = '0x1234567890098765432112345678900987654321';
    checkContract(web3, address, function(result) {
      expect(result).to.equals('Not a valid smart contract address');
    });
  });

});
