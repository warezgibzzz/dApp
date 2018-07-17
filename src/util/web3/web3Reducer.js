import { WEB3_INITIALIZED } from './getWeb3';

const initialState = {
  web3Instance: null,
  network: null,
  networkId: 0
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === WEB3_INITIALIZED) {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
      network: action.payload.network,
      networkId: action.payload.networkId
    });
  }

  return state;
};

export default web3Reducer;
