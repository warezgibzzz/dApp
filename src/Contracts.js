let MarketContractRegistry = {};
let MarketContractFactory = {};
let MarketContract = {};
let MarketCollateralPool = {};
let MarketToken = {};
let CollateralToken = {};
let QueryTest = {};
let ERC20 = {};
let OrderLib = {};

if (process.env.NODE_ENV !== 'test') {
  // only load contracts abi if build exists.
  // useful when running tests

  MarketContractRegistry = require('../build/contracts/MarketContractRegistry');
  MarketContractFactory = require('../build/contracts/MarketContractFactoryOraclize');
  MarketContract = require('../build/contracts/MarketContractOraclize');
  MarketCollateralPool = require('../build/contracts/MarketCollateralPool');
  MarketToken = require('../build/contracts/MarketToken');
  CollateralToken = require('../build/contracts/CollateralToken');
  QueryTest = require('../build/contracts/OraclizeQueryTest');
  ERC20 = require('market-solidity/build/contracts/ERC20');
  OrderLib = require('../build/contracts/OrderLib');
}

export default {
  MarketContractRegistry,
  MarketContractFactory,
  MarketContract,
  MarketCollateralPool,
  MarketToken,
  CollateralToken,
  QueryTest,
  ERC20,
  OrderLib
};
