export default function reducer(
  state = {
    results: null,
    loading: false,
    error: null,
    transaction: null
  },
  action
) {
  const actionType = 'TEST_QUERY';
  switch (action.type) {
    case `${actionType}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      };

    case `${actionType}_TRANSACTION_PENDING`:
      return {
        ...state,
        loading: true,
        transaction: action.payload,
        error: null
      };

    case `${actionType}_FULFILLED`:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null
      };

    case `${actionType}_REJECTED`:
      return {
        ...state,
        loading: false,
        results: null,
        error: action.payload
      };

    default:
      return state;
  }
}
