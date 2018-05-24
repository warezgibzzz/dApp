import { expect } from 'chai';
import sinon from 'sinon';
import Web3 from 'web3';

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
      const mockWeb3 = { isAddress: any => false };

      FormValidators(mockWeb3).ethAddressValidator({}, '0xdf', callbackSpy);

      expect(callbackSpy).to.have.property('callCount', 1);
      expect(callbackSpy.getCall(0).args[0]).to.equal('Invalid ETH address'); // invalid
    });

    it('should invoke callback() with no argument if address is valid', () => {
      const callbackSpy = sinon.spy();
      const mockWeb3 = { isAddress: any => true };

      FormValidators(mockWeb3).ethAddressValidator({}, '0x00003', callbackSpy);

      expect(callbackSpy).to.have.property('callCount', 1);
      expect(callbackSpy.getCall(0).args[0]).to.equal(undefined); // valid
    });
  });

  describe('checkERC20Contract', () => {
    //Use Rinkey testnet  in case of test on travis or else use localhost:9545
    const web3Url =
      process.env.NODE_ENV === 'test'
        ? 'https://rinkeby.infura.io/3632KD8OP9iixQqYbSjj'
        : 'http://localhost:9545';

    // set the provider you want from Web3.providers
    const web3 = new Web3(new Web3.providers.HttpProvider(web3Url));

    it('should validate contract based on the valid address provided', done => {
      const address = '0x29317b796510afc25794e511e7b10659ca18048b'; // Market Token Address
      FormValidators(web3).checkERC20Contract(address, function(result) {
        expect(result).to.equals(undefined);
        done();
      });
    });

    it('should simply exit when web3 is not provided', done => {
      const address = '0x29317b796510afc25794e511e7b10659ca18048b'; // Market Token Address
      FormValidators().checkERC20Contract(address, function(result) {
        expect(result).to.equals(undefined);
        done();
      });
    });

    it('should return err from callback of eth.getCode', done => {
      const address = '0x29317b796510afc25794e511e7b10659ca18048b'; // Market Token Address
      const mockWeb3 = {
        eth: {
          getCode(value, callback) {
            callback('MockError');
          }
        },
        version: {
          network: '4'
        }
      };
      FormValidators(mockWeb3).checkERC20Contract(address, function(result) {
        expect(result).to.equals('MockError');
        done();
      });
    });

    it('should return err thrown by eth.getCode', done => {
      const address = '0x29317b796510afc25794e511e7b10659ca18048b'; // Market Token Address
      const mockWeb3 = {
        eth: {
          getCode(value, callback) {
            throw { message: 'invalid address' };
          }
        },
        version: {
          network: '4'
        }
      };
      FormValidators(mockWeb3).checkERC20Contract(address, function(result) {
        expect(result).to.equals('Invalid Address');
        done();
      });
    });

    it('should invalidate the contract based on the invalid smart contract address provided', done => {
      const address = '0x1234567890098765432112345678900987654321';
      FormValidators(web3).checkERC20Contract(address, function(result) {
        expect(result).to.equals('Not a valid smart contract address');
        done();
      });
    });

    it('should invalidate the contract based on the invalid ERC20 address provided', done => {
      const address = '0xc51b536AD6169bb7F8c893FF4b744d03433455cB';
      FormValidators(web3).checkERC20Contract(address, function(result) {
        expect(result).to.equals('Not a valid ERC20 smart contract address');
        done();
      });
    });
  });
});
