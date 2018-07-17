const CollateralToken = require('../build/contracts/InitialAllocationCollateralToken');
const ERC20 = require('@marketprotocol/marketprotocol/build/contracts/ERC20');
const MarketContractRegistry = require('../build/contracts/MarketContractRegistry');
const MarketContractFactory = require('../build/contracts/MarketContractFactoryOraclize');
const MarketContract = require('../build/contracts/MarketContractOraclize');
const MarketCollateralPool = require('@marketprotocol/marketprotocol/build/contracts/MarketCollateralPool');
const MarketCollateralPoolFactory = require('../build/contracts/MarketCollateralPoolFactory');
const MarketToken = require('../build/contracts/MarketToken');
const MathLib = require('../build/contracts/MathLib');
const OrderLib = require('../build/contracts/OrderLib');
const QueryTest = require('../build/contracts/OraclizeQueryTest');

export default {
  CollateralToken,
  ERC20,
  MarketContractRegistry,
  MarketContractFactory,
  MarketContract,
  MarketCollateralPool,
  MarketCollateralPoolFactory,
  MarketToken,
  MathLib,
  OrderLib,
  QueryTest
};
