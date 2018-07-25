import { expect } from 'chai';

import {
  getMetamaskError,
  calculateCollateral,
  getCollateralTokenAddress,
  getLocationOrigin,
  toBaseUnit,
  fromBaseUnit,
  getEtherscanUrl,
  copyTextToClipboard
} from '../../src/util/utils';

describe('getMetamaskError', () => {
  it('should return "User denied transaction" for declined MetaMask transactions', async () => {
    const expectedErrorMessage = 'User denied transaction';

    const actualErrorMessage = getMetamaskError(
      'Error: MetaMask Tx Signature: User denied transaction signature.'
    );

    expect(actualErrorMessage).to.equals(expectedErrorMessage);
  });

  it('should return original error message as a fallback', async () => {
    const expectedErrorMessage =
      'Error: MetaMask Tx Signature: User denied signature.';

    const actualErrorMessage = getMetamaskError(
      'Error: MetaMask Tx Signature: User denied signature.'
    );

    expect(actualErrorMessage).to.equals(expectedErrorMessage);
  });
});

/*describe('signMessage', () => {
  function getStubedWeb3(rawSignature) {
    const fakeProvider = new FakeProvider();
    const web3 = new Web3(fakeProvider);
    fakeProvider.injectResult(rawSignature);
    return web3;
  }

  it('should correctly extract [v, r, s] from signature', () => {
    const rawSignature =
      '0x9955af11969a2d2a7f860cb00e6a00cfa7c581f5df2dbe8ea16700b33f4b4b9b69f945012f7ea7d3febf11eb1b78e1adc2d1c14c2cf48b25000938cc1860c83e01';
    const web3 = getStubedWeb3(rawSignature);
    const v = 28;
    const r =
      '0x9955af11969a2d2a7f860cb00e6a00cfa7c581f5df2dbe8ea16700b33f4b4b9b';
    const s =
      '0x69f945012f7ea7d3febf11eb1b78e1adc2d1c14c2cf48b25000938cc1860c83e';

    signMessage(
      web3,
      '0xf204a4ef082f5c04bb89f7d5e6568b796096735a',
      'This is my message :)'
    ).then(([actualV, actualR, actualS]) => {
      expect(v, 'v not extracted correctly').to.equal(actualV);
      expect(r, 'r not extracted correctly').to.equal(actualR);
      expect(s, 's not extracted correctly').to.equal(actualS);
    });
  });
});*/

describe('calculateCollateral', () => {
  [
    /* [priceFloor, priceCap, qtyMultiplier, qty,   price,    expectedCollateral] */
    [20, 50, 2, 3, 10, 0],
    [20, 50, 2, 3, 25, 30],
    [20, 50, 2, -3, 60, 0],
    [20, 50, 2, -3, 25, 150]
  ].forEach(testCase => {
    it(`expects calculateCollateral(${testCase.slice(0, 5)}) to equal ${
      testCase[5]
    }`, () => {
      const actualCollateral = calculateCollateral(...testCase);
      const expectedCollateral = testCase[5];

      expect(expectedCollateral).to.equal(actualCollateral);
    });
  });
});

describe('getEtherscanUrl', () => {
  it('should return the correct etherscan url for the supplied eth network', () => {
    expect(getEtherscanUrl('mainnet')).to.equal('https://etherscan.io');

    expect(getEtherscanUrl('morden')).to.equal('https://morden.etherscan.io');

    expect(getEtherscanUrl('ropsten')).to.equal('https://ropsten.etherscan.io');

    expect(getEtherscanUrl('rinkeby')).to.equal('https://rinkeby.etherscan.io');

    expect(getEtherscanUrl('kovan')).to.equal('https://kovan.etherscan.io');
  });
});

describe('getCollateralTokenAddress', () => {
  it('should return correct collateral address ', () => {
    expect(getCollateralTokenAddress('rinkeby', 'ETH')).to.equal(
      '0x2021c394e8fce5e56c166601a0428e4611147802'
    );
    expect(getCollateralTokenAddress('rinkeby', 'WETH')).to.equal(
      '0xc778417e063141139fce010982780140aa0cd5ab'
    );
    expect(getCollateralTokenAddress('rinkeby', 'USDT')).to.equal(
      '0xee78ae82ab0bbbae6d99b36a999e7b6de2e8664b'
    );
    expect(getCollateralTokenAddress('rinkeby', 'INVALIDQUOTE')).to.equal('');
    expect(getCollateralTokenAddress('invalidnetwork', 'ETH')).to.equal('');
  });
});

describe('copyTextToClipboard', () => {
  it('should copy text to clipboard and show message ', () => {
    expect(copyTextToClipboard('The is a test message')).to.equal();
  });
});

describe('toBaseUnit', () => {
  it('should return a big number', () => {
    expect(toBaseUnit('5.5', 18)).to.equal(5500000000000000000);
  });
});

describe('fromBaseUnit', () => {
  it('should return a small number', () => {
    expect(fromBaseUnit('5500000000000000000', 18)).to.equal(5.5);
  });
});

describe('getLocationOrigin', () => {
  it('should return location origin', () => {
    expect(getLocationOrigin()).to.equal(window.location.origin);
  });
});
