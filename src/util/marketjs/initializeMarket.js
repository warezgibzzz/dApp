import { Market } from '@marketprotocol/marketjs';

import Contracts from '../../Contracts';
import store from '../../store';

import showMessage from '../../components/message';
import { getContractAddress } from '../utils';

export const MARKETJS_INITIALIZED = 'MARKETJS_INITIALIZED';

function marketjsInitialized(marketjsInstance) {
  return {
    type: MARKETJS_INITIALIZED,
    payload: marketjsInstance
  };
}

const initializeMarket = (
  web3,
  showErrorMessage = showMessage.bind(showMessage, 'error'),
  dispatch = store.dispatch.bind(store)
) =>
  new Promise((resolve, reject) => {
    let marketjs;

    if (web3 && web3.web3Instance) {
      const networkId = web3.networkId;

      marketjs = new Market(web3.web3Instance.currentProvider, {
        marketContractRegistryAddress: getContractAddress(
          Contracts.MarketContractRegistry,
          networkId
        ),
        marketContractFactoryAddress: getContractAddress(
          Contracts.MarketContractFactory,
          networkId
        ),
        marketCollateralPoolFactoryAddress: getContractAddress(
          Contracts.MarketCollateralPoolFactory,
          networkId
        ),
        marketTokenAddress: getContractAddress(
          Contracts.MarketToken,
          networkId
        ),
        mathLibAddress: getContractAddress(Contracts.MathLib, networkId),
        orderLibAddress: getContractAddress(Contracts.OrderLib, networkId),
        networkId
      });
    }

    resolve(dispatch(marketjsInitialized(marketjs)));
  });

export default initializeMarket;
