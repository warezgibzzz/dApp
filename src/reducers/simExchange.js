export default function reducer(
  state = {
    asks: [],
    bids: [],
    error: null,
    loading: false,
    contract: null,
    trades: null,
  },
  action,
) {
  const getAsksAction = 'GET_ASKS';
  const getBidsAction = 'GET_BIDS';
  const tradeOrderAction = 'TRADE_ORDER';

  switch (action.type) {
    case `${getAsksAction}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `${getAsksAction}_FULFILLED`:
      return {
        ...state,
        loading: false,
        asks: action.payload,
        error: null,
      };

    case `${getAsksAction}_REJECTED`:
      return {
        ...state,
        loading: false,
        asks: null,
        error: action.payload,
      };

    case `${getBidsAction}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `${getBidsAction}_FULFILLED`:
      return {
        ...state,
        loading: false,
        bids: action.payload,
        error: null,
      };

    case `${getBidsAction}_REJECTED`:
      return {
        ...state,
        loading: false,
        bids: null,
        error: action.payload,
      };

    case `${tradeOrderAction}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `${tradeOrderAction}_FULFILLED`:
      return {
        ...state,
        loading: false,
        trades: action.payload,
        error: null,
      };

    case `${tradeOrderAction}_REJECTED`:
      return {
        ...state,
        loading: false,
        trades: null,
        error: action.payload,
      };

    case 'SELECTED_CONTRACT':
      return {
        ...state,
        contract: action.payload
      };

    default:
      return state;
  }
}
