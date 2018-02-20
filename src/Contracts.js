
let MarketContractRegistry = {};
let MarketContract = {};
let MarketCollateralPool = {};
let MarketToken = {};
let QueryTest = {};

if(process.env.NODE_ENV !== 'test') {
  // only load contracts abi if build exists.
  // useful when running tests

  MarketContractRegistry = require('./build/contracts/MarketContractRegistry');
  MarketContract = require('./build/contracts/MarketContractOraclize');
  MarketCollateralPool = require('./build/contracts/MarketCollateralPool');
  MarketToken = require('./build/contracts/MarketToken');
  QueryTest = require('./build/contracts/OraclizeQueryTest');
}

export default {
  MarketContractRegistry,
  MarketContract,
  MarketCollateralPool,
  MarketToken,
  QueryTest
};