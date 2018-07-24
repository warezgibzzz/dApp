import store from '../../store';
import abi from 'human-standard-token-abi';
import moment from 'moment';

import { toBaseUnit } from '../utils';
import showMessage from '../../components/message';

import Contracts from '../../Contracts.js';
import CreateInitializer, {
  contractConstructor
} from '../web3/contractInitializer';

// PUBLIC

/**
 * This file is a middleware wrapper for the MARKET.js library. It abstracts away
 * the cruft of building up the needed objects to complete these transactions.
 **/

/**
 * @param orderData user inputed order data object {qty, price, expirationTimestamp}
 * @returns {object} signed order hash
 **/
const createSignedOrderAsync = orderData => {
  const { marketjs, simExchange } = store.getState();
  const web3 = store.getState().web3.web3Instance;

  const initializeContracts = CreateInitializer(
    contractConstructor.bind(null, web3)
  );
  const contracts = initializeContracts(Contracts);

  return contracts.OrderLib.deployed().then(orderLib => {
    let order = {
      contractAddress: simExchange.contract.MARKET_COLLATERAL_POOL_ADDRESS,
      expirationTimestamp: web3.toBigNumber(
        moment(orderData.expirationTimestamp).unix()
      ),
      feeRecipient: '0x0000000000000000000000000000000000000000',
      maker: web3.eth.coinbase,
      makerFee: web3.toBigNumber(0),
      taker: '',
      takerFee: web3.toBigNumber(0),
      orderQty: web3.toBigNumber(orderData.qty),
      price: web3.toBigNumber(orderData.price),
      salt: web3.toBigNumber(Math.random())
    };

    return marketjs.createSignedOrderAsync(orderLib.address, ...Object.values(order));
  });
};

/**
 * @param contract a valid market contract (required)
 * @param toString boolean - if true will convert the response to a fixed number
 * string otherwise returns bigNumber(optional)
 * @returns BigNumber or String value of an addresses unallocated collateral
 **/
/**
 * @param amount the amount of collateral tokens you want to deposit
 * @returns boolean
 **/
const depositCollateralAsync = amount => {
  const { simExchange, marketjs } = store.getState();
  const web3 = store.getState().web3.web3Instance;

  const txParams = {
    from: web3.eth.coinbase
  };

  let collateralTokenContractInstance = web3.eth
    .contract(abi)
    .at(simExchange.contract.COLLATERAL_TOKEN_ADDRESS);

  collateralTokenContractInstance.decimals.call((err, decimals) => {
    collateralTokenContractInstance.approve(
      simExchange.contract.MARKET_COLLATERAL_POOL_ADDRESS,
      web3.toBigNumber(toBaseUnit(amount.number, decimals)),
      txParams,
      (err, res) => {
        if (err) {
          console.error(err);
        } else {
          marketjs
            .depositCollateralAsync(
              simExchange.contract.MARKET_COLLATERAL_POOL_ADDRESS,
              web3.toBigNumber(toBaseUnit(amount.number, decimals)),
              txParams
            )
            .then(res => {
              showMessage(
                'success',
                'Deposit successful, your transaction will process shortly.',
                5
              );

              return res;
            });
        }
      }
    );
  });
};

const getUserAccountBalanceAsync = (contract, toString) => {
  const marketjs = store.getState().marketjs;
  const web3 = store.getState().web3.web3Instance;

  return marketjs
    .getUserAccountBalanceAsync(
      contract.MARKET_COLLATERAL_POOL_ADDRESS,
      web3.eth.coinbase
    )
    .then(res => {
      switch (toString) {
        case true:
          const unallocatedCollateral = web3
            .fromWei(res.toFixed(), 'ether')
            .toString();

          return unallocatedCollateral;
        default:
          return res;
      }
    });
};

/**
 * @param amount the amount of collateral tokens you want to deposit
 * @returns boolean
 **/
const withdrawCollateralAsync = amount => {
  const { simExchange, marketjs } = store.getState();
  const web3 = store.getState().web3.web3Instance;

  const txParams = {
    from: web3.eth.coinbase
  };

  let collateralTokenContractInstance = web3.eth
    .contract(abi)
    .at(simExchange.contract.COLLATERAL_TOKEN_ADDRESS);

  collateralTokenContractInstance.decimals.call((err, decimals) => {
    marketjs
      .withdrawCollateralAsync(
        simExchange.contract.MARKET_COLLATERAL_POOL_ADDRESS,
        toBaseUnit(amount.number, decimals),
        txParams
      )
      .then(res => {
        showMessage(
          'success',
          'Withdraw successful, your transaction will process shortly.',
          5
        );

        return res;
      });
  });
};

export const MarketJS = {
  createSignedOrderAsync,
  depositCollateralAsync,
  getUserAccountBalanceAsync,
  withdrawCollateralAsync
};
