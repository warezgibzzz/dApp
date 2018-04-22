import { dAppErrorMessage } from '../util/utils';

/**
 *
 * @param {web3} web3
 * @param {*} contractSpecs  Specs of new contract to be deployed
 * @param {*} MarketContractRegistry marketContractRegistryProvider
 * @param {*}
 */
export function deployContract(
  { web3, contractSpecs },
  { MarketContractRegistry, MarketContract, MarketCollateralPool, MarketToken },
) {
  const type = 'DEPLOY_CONTRACT';

  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({ type: `${type}_PENDING` });
      // Double-check web3's status
      if (web3 && typeof web3 !== 'undefined') {
        // create array to pass to MARKET contract constructor
        const contractConstructorArray = [
          contractSpecs.priceFloor,
          contractSpecs.priceCap,
          contractSpecs.priceDecimalPlaces,
          contractSpecs.qtyMultiplier,
          contractSpecs.expirationTimeStamp
        ];

        // Get current ethereum wallet.
        web3.eth.getCoinbase((error, coinbase) => {
          // Log errors, if any
          // TODO(perfectmak): handle this error
          if (error) {
            console.error(error);
          }

          console.log('Attempting to deploy contract from ' + coinbase);

          // find the address of the MKT token so we can link to our deployed contract
          let marketContractInstanceDeployed;

          MarketToken
            .deployed()
            .then(function(marketTokenInstance) {
              return MarketContract.new(
                contractSpecs.contractName,
                marketTokenInstance.address,
                contractSpecs.baseTokenAddress,
                contractConstructorArray,
                contractSpecs.oracleDataSource,
                contractSpecs.oracleQuery,
                {
                  gas: 5700000, // TODO : Remove hard-coded gas
                  gasPrice: web3.toWei(2, 'gwei'),
                  from: coinbase
                }
              );
            })
            .then(function(marketContractInstance) {
              marketContractInstanceDeployed = marketContractInstance;
              return MarketCollateralPool.new(marketContractInstance.address, {
                gas: 2100000,
                gasPrice: web3.toWei(2, 'gwei'),
                from: coinbase
              });
            })
            .then(function(marketCollateralPoolInstance) {
              return marketContractInstanceDeployed.setCollateralPoolContractAddress(
                marketCollateralPoolInstance.address, {
                  from: coinbase,
                  gasPrice: web3.toWei(2, 'gwei')
                }
              );
            })
            .then(function() {
              return MarketContractRegistry.deployed();
            })
            .then(function(marketContractRegistryInstance) {
              marketContractRegistryInstance.addAddressToWhiteList(
                marketContractInstanceDeployed.address,
                {
                  from: web3.eth.accounts[0],
                  gasPrice: web3.toWei(2, 'gwei')
                }
              );

              dispatch({ type: `${type}_FULFILLED`, payload: marketContractInstanceDeployed });
              resolve(marketContractInstanceDeployed);
            })
            .catch(err => {
              dispatch({ type: `${type}_REJECTED`,
                         payload: dAppErrorMessage(err.message.split('\n')[0]) });
              reject(dAppErrorMessage(err.message.split('\n')[0]));
            });
        });
      } else {
        dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
        reject('Web3 not initialised');
      }
    });
  };
}
