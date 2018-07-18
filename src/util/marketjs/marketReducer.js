import { MARKETJS_INITIALIZED } from './initializeMarket';

const marketReducer = (state = {}, action) => {
  if (action.type === MARKETJS_INITIALIZED) {
    return action.payload;
  }

  return state;
};

export default marketReducer;
