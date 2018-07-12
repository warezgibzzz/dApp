import { getMetamaskError } from '../util/utils';

/**
 *
 * @param {web3} web3
 * @param {*} contractSpecs  Specs of new contract to be deployed
 * @param {*} MarketContractRegistry marketContractRegistryProvider
 * @param {*}
 */
export function deployContract(
  { web3, contractSpecs },
  {
    MarketContractRegistry,
    MarketContract,
    MarketContractFactory,
    MarketCollateralPool,
    MarketCollateralPoolFactory
  }
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
          if (error) {
            console.error(error);
            dispatch({
              type: `${type}_REJECTED`,
              payload: getMetamaskError(error.message.split('\n')[0])
            });

            return reject(getMetamaskError(error.message.split('\n')[0]));
          }

          console.log('Attempting to deploy contract from ' + coinbase);

          dispatch({
            type: `${type}_CONTRACT_DEPLOYMENT_STARTED`
          });

          // find the address of the MKT token so we can link to our deployed contract
          let marketContractInstanceDeployed;
          let marketContractDeployedAddress;

          let txParams = {
            gas: contractSpecs.gas,
            gasPrice: web3.toWei(contractSpecs.gasPrice, 'gwei'),
            from: coinbase
          };

          MarketContractFactory.deployed()
            .then(function(contractFactory) {
              console.log(contractSpecs);
              return contractFactory.deployMarketContractOraclize(
                contractSpecs.contractName,
                contractSpecs.collateralTokenAddress,
                contractConstructorArray,
                contractSpecs.oracleDataSource,
                contractSpecs.oracleQuery,
                txParams
              );
            })
            .then(function(marketContractDeployResults) {
              marketContractDeployedAddress =
                marketContractDeployResults.logs[0].args.contractAddress;
              console.log(
                'Market Contract deployed to ' + marketContractDeployedAddress
              );

              dispatch({
                type: `${type}_CONTRACT_DEPLOYED`,
                payload: {
                  deploymentResults: marketContractDeployResults
                }
              });

              return MarketContract.at(marketContractDeployedAddress).then(
                function(deployedMarketContract) {
                  marketContractInstanceDeployed = deployedMarketContract;
                  return MarketCollateralPoolFactory.deployed()
                    .then(function(collateralPoolFactory) {
                      return collateralPoolFactory.deployMarketCollateralPool(
                        marketContractDeployedAddress,
                        txParams
                      );
                    })
                    .then(function(marketCollateralPoolDeployResults) {
                      dispatch({
                        type: `${type}_COLLATERAL_POOL_DEPLOYED`,
                        payload: {
                          deploymentResults: marketCollateralPoolDeployResults
                        }
                      });
                    })
                    .catch(err => {
                      dispatch({
                        type: `${type}_REJECTED`,
                        payload: getMetamaskError(err.message.split('\n')[0])
                      });

                      reject(getMetamaskError(err.message.split('\n')[0]));
                    });
                }
              );
            })
            .then(function() {
              dispatch({
                type: `${type}_FULFILLED`,
                payload: marketContractInstanceDeployed
              });

              resolve(marketContractInstanceDeployed);
            })
            .catch(err => {
              dispatch({
                type: `${type}_REJECTED`,
                payload: getMetamaskError(err.message.split('\n')[0])
              });

              reject(getMetamaskError(err.message.split('\n')[0]));
            });
        });
      } else {
        dispatch({
          type: `${type}_REJECTED`,
          payload: { error: 'Web3 not initialised' }
        });

        reject('Web3 not initialised');
      }
    });
  };
}

export function resetDeploymentState(preservations) {
  return function(dispatch) {
    dispatch({
      type: 'DEPLOY_CONTRACT_RESET_STATE',
      payload: preservations ? preservations : {}
    });
  };
}

// TODO: Add getGasEstimate for creating new MarketContract
// Ref: https://github.com/trufflesuite/truffle-contract/tree/web3-one-readme
