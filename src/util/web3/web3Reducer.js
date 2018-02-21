const initialState = {
  web3Instance: null
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
      network: action.payload.network
    });
  }

  return state;
};

export default web3Reducer;
