import { expect } from 'chai';
import sinon from 'sinon';

import contractInitializer from '../../../src/util/web3/contractInitializer';

describe('contractInitializer', () => {
  it('should throw error if constract constructor is missing', () => {
    expect(() => {
      contractInitializer();
    }).to.throw();
  });

  it('should throw error if contract constructor is not a function', () => {
    expect(() => {
      contractInitializer({});
    }).to.throw();

    expect(() => {
      contractInitializer(2);
    }).to.throw();
  });

  it('should return initializer function', () => {
    const initializer = contractInitializer(sinon.stub());
    expect(initializer).to.be.a('function');
  });

  it('should invoke contract constructor initalizer on each contract in initializer', () => {
      const contractConstructor = (contract) => {
        return `${contract}-initialized`;
      };
      const initializer = contractInitializer(contractConstructor);
      const testContracts = { a: 'a', b: 'b' };
      const expectedInitializedContracts = { a: 'a-initialized', b: 'b-initialized' };

      const actualInitializedContracts = initializer(testContracts);
      
      expect(actualInitializedContracts).to.be.deep.equal(expectedInitializedContracts);
  });
});
