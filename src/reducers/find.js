export default function reducer(
  state = {
    contract: [],
    loading: false,
    error: null,
  },
  action,
) {
  const actionType = 'FIND_CONTRACT';
  switch (action.type) {
    case `${actionType}_PENDING`:
      return {
        ...state,
        loading: true,
        contract: [],
        error: null,
      };

    case `${actionType}_FULFILLED`:
      return {
        ...state,
        loading: false,
        contract: action.payload,
        error: null,
      };

    case `${actionType}_REJECTED`:
      return {
        ...state,
        loading: false,
        contract: [],
        error: action.payload,
      };

    default:
      return state;
  }
}
