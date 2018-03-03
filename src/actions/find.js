import contract from 'truffle-contract';
import { processContractsList } from './explorer';

export function findContract({ web3 }, marketContractAddress,
{ MarketContractRegistry, MarketContract, MarketCollateralPool, CollateralToken }) {
  const type = 'FIND_CONTRACT';

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });

    if (web3 && typeof web3 !== 'undefined') {
      const marketContractRegistry = contract(MarketContractRegistry);
      marketContractRegistry.setProvider(web3.currentProvider);

      const marketContract = contract(MarketContract);
      marketContract.setProvider(web3.currentProvider);

      const marketCollateralPool = contract(MarketCollateralPool);
      marketCollateralPool.setProvider(web3.currentProvider);

      const collateralToken = contract(CollateralToken);
      collateralToken.setProvider(web3.currentProvider);
      collateralToken.deployed().then();

      let marketContractRegistryInstance;
      marketContractRegistry.deployed().then(function(instance) {
        marketContractRegistryInstance = instance;
        marketContractRegistryInstance.isAddressWhiteListed(marketContractAddress["marketContractAddress"])
        .then( isWhiteListed => {
            if (isWhiteListed) {
            processContractsList([marketContractAddress["marketContractAddress"]], marketContract, marketCollateralPool, collateralToken)
              .then(function (data) {
                console.log('Dispatch Found Contract');
                const contractPayload = Object.keys(data[0]).map(key => ({
                  name: key,
                  value: data[0][key] }));
                dispatch({ type: `${type}_FULFILLED`, payload: contractPayload });
              });
            } else {
              dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Contract is not whitelisted!'} });
            };
          });
      });
    } else {
      dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
    }
  };
}
