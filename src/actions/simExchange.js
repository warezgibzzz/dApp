export function selectContract({ contract }) {
  return function(dispatch) {
    dispatch({ type: 'SELECTED_CONTRACT', payload: contract });
  };
}
