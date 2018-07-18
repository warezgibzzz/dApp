import { Market } from '@marketprotocol/marketjs';
import store from '../../store';
import showMessage from '../../components/message';

export const MARKETJS_INITIALIZED = 'MARKETJS_INITIALIZED';

function marketjsInitialized(marketjsInstance) {
  return {
    type: MARKETJS_INITIALIZED,
    payload: marketjsInstance
  };
}

let initializeMarket = (
  window,
  showErrorMessage = showMessage.bind(showMessage, 'error'),
  dispatch = store.dispatch.bind(store)
) =>
  new Promise((resolve, reject) => {
    let marketjs;
    let web3 = store.getState().web3.web3Instance;

    console.log('web3', web3);

    if (web3 !== null) {
      marketjs = new Market(web3.currentProvider, { networkId: 4 });
      resolve(dispatch(marketjsInitialized(marketjs)));
    }
  });

export default initializeMarket;
