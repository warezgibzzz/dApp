export default function reducer(
  state = {
    error: null,
    loading: false,
    contract: null,
    trades: null
  },
  action
) {
  switch (action.type) {
    case 'SELECTED_CONTRACT':
      return {
        ...state,
        contract: action.payload
      };

    default:
      return state;
  }
}
