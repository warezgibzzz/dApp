/**
 * Finds contracts at `marketContractAddress` and processed it with process contracts
 * before dispatching the result
 *
 * @param {*} web3 A Web3 Instance
 * @param {*} processContracts A function that accepts an array of contract addresses and returns an array of formated contracts.
 * @param {string} marketContractAddress Address of market contract to find
 */
export function findContract({ web3, processContracts }, { marketContractAddress },
{ MarketContractRegistry, CollateralToken }) {
  const type = 'FIND_CONTRACT';

  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({ type: `${type}_PENDING` });

      if (web3 && typeof web3 !== 'undefined') {
        CollateralToken.deployed().then();

        let marketContractRegistryInstance;
        MarketContractRegistry.deployed().then(function(instance) {
          marketContractRegistryInstance = instance;
          marketContractRegistryInstance.isAddressWhiteListed(marketContractAddress)
          .then(isWhiteListed => {
              if (isWhiteListed) {
                processContracts([marketContractAddress])
                .then(function (data) {
                  const contractPayload = Object.keys(data[0]).map(key => ({
                    name: key,
                    value: data[0][key] }));
                  dispatch({ type: `${type}_FULFILLED`, payload: contractPayload });
                  resolve(contractPayload);
                });
              } else {
                dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Contract is not whitelisted!'} });
                reject('Contract is not whitelisted!');
              }
            });
        });
      } else {
        dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
        reject('Web3 not initialized');
      }
    });
  };
}
