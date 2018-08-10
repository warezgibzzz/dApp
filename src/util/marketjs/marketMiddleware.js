import BigNumber from 'bignumber.js';
import abi from 'human-standard-token-abi';
import moment from 'moment';

import store from '../../store';

import { toBaseUnit } from '../utils';
import showMessage from '../../components/message';

import { NULL_ADDRESS } from '../../constants';

// PUBLIC

/**
 * This file is a middleware wrapper for the MARKET.js library. It abstracts away
 * the cruft of building up the needed objects to complete these transactions.
 **/

/**
 * @param orderData user inputed order data object {qty, price, expirationTimestamp}
 * @returns {object} signed order hash
 **/
const createSignedOrderAsync = (orderData, str = store) => {
  const { marketjs, simExchange, web3 } = str.getState();

  let order = {
    contractAddress: simExchange.contract.key,
    expirationTimestamp: new BigNumber(
      moment(orderData.expirationTimestamp).unix()
    ),
    feeRecipient: NULL_ADDRESS,
    maker: web3.web3Instance.eth.coinbase,
    makerFee: new BigNumber(0),
    taker: NULL_ADDRESS,
    takerFee: new BigNumber(0),
    orderQty: new BigNumber(orderData.qty),
    price: new BigNumber(orderData.price),
    salt: new BigNumber(Math.floor(Math.random() * (99999999999 - 1 + 1)) + 1)
  };

  return marketjs.createSignedOrderAsync(
    ...Object.values(order),
    web3.web3Instance.currentProvider.isMetaMask ? true : false
  );
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
const depositCollateralAsync = (amount, str = store) => {
  const { simExchange, marketjs } = str.getState();
  const web3 = str.getState().web3.web3Instance;

  const txParams = {
    from: web3.eth.coinbase
  };

  let collateralTokenContractInstance = web3.eth
    .contract(abi)
    .at(simExchange.contract.COLLATERAL_TOKEN_ADDRESS);

  collateralTokenContractInstance.decimals.call((err, decimals) => {
    collateralTokenContractInstance.approve(
      simExchange.contract.key,
      web3.toBigNumber(toBaseUnit(amount.number, decimals)),
      txParams,
      (err, res) => {
        if (err) {
          console.error(err);
        } else {
          marketjs
            .depositCollateralAsync(
              simExchange.contract.key,
              new BigNumber(toBaseUnit(amount.number, decimals)),
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

const getUserAccountBalanceAsync = (contract, toString, str = store) => {
  const marketjs = str.getState().marketjs;
  const web3 = str.getState().web3.web3Instance;

  return marketjs
    .getUserAccountBalanceAsync(contract.key, web3.eth.coinbase)
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

const tradeOrderAsync = (signedOrderJSON, str = store) => {
  const { marketjs } = str.getState();
  const web3 = str.getState().web3.web3Instance;
  const signedOrder = JSON.parse(signedOrderJSON);

  const txParams = {
    from: web3.eth.coinbase,
    gas: 40000
  };
  signedOrder.expirationTimestamp = new BigNumber(
    signedOrder.expirationTimestamp
  );

  signedOrder.makerFee = new BigNumber(signedOrder.makerFee);
  signedOrder.orderQty = new BigNumber(signedOrder.orderQty);
  signedOrder.price = new BigNumber(signedOrder.price);
  signedOrder.remainingQty = new BigNumber(signedOrder.remainingQty);
  signedOrder.takerFee = new BigNumber(signedOrder.takerFee);
  signedOrder.salt = new BigNumber(signedOrder.salt);

  console.log('signedOrderJSON', signedOrder);

  return marketjs
    .tradeOrderAsync(signedOrder, signedOrder.orderQty, txParams)
    .then(res => {
      return res;
    });
};

/**
 * @param amount the amount of collateral tokens you want to deposit
 * @returns boolean
 **/
const withdrawCollateralAsync = (amount, str = store) => {
  const { simExchange, marketjs } = str.getState();
  const web3 = str.getState().web3.web3Instance;

  const txParams = {
    from: web3.eth.coinbase
  };

  let collateralTokenContractInstance = web3.eth
    .contract(abi)
    .at(simExchange.contract.COLLATERAL_TOKEN_ADDRESS);

  collateralTokenContractInstance.decimals.call((err, decimals) => {
    marketjs
      .withdrawCollateralAsync(
        simExchange.contract.key,
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
  tradeOrderAsync,
  withdrawCollateralAsync
};
