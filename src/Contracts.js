let MarketContractRegistry = {};
let MarketContract = {};
let MarketCollateralPool = {};
let MarketToken = {};
let CollateralToken = {};
let QueryTest = {};
let ERC20 ={};

if (process.env.NODE_ENV !== 'test') {
  // only load contracts abi if build exists.
  // useful when running tests

  MarketContractRegistry = require('../build/contracts/MarketContractRegistry');
  MarketContract = require('../build/contracts/MarketContractOraclize');
  MarketCollateralPool = require('../build/contracts/MarketCollateralPool');
  MarketToken = require('../build/contracts/MarketToken');
  CollateralToken = require('../build/contracts/CollateralToken');
  QueryTest = require('../build/contracts/OraclizeQueryTest');
  ERC20 = require('../node_modules/market-solidity/build/contracts/ERC20');
}

export default {
  MarketContractRegistry,
  MarketContract,
  MarketCollateralPool,
  MarketToken,
  CollateralToken,
  QueryTest,
  ERC20
};
