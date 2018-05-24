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
    MarketCollateralPool
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
              return contractFactory.deployMarketContractOraclize(
                contractSpecs.contractName,
                contractSpecs.baseTokenAddress,
                contractConstructorArray,
                contractSpecs.oracleDataSource,
                contractSpecs.oracleQuery,
                {
                  ...txParams,
                  gas: 4000000, // TODO : Remove hard-coded gas
                }
              );
            })
            .then(function(marketContractDeployResults) {
              marketContractDeployedAddress =
                marketContractDeployResults.logs[0].args.contractAddress;
              console.log(
                'Market Contract deployed to ' + marketContractDeployedAddress
              );
              return MarketCollateralPool.new(
                marketContractDeployedAddress,
                txParams
              );
            })
            .then(function(marketCollateralPoolInstance) {
              console.log(
                'Market Collateral Pool deployed to ' +
                  marketCollateralPoolInstance.address
              );
              return MarketContract.at(marketContractDeployedAddress).then(
                function(deployMarketContract) {
                  marketContractInstanceDeployed = deployMarketContract;
                  return deployMarketContract.setCollateralPoolContractAddress(
                    marketCollateralPoolInstance.address,
                    txParams
                  );
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

// TODO: Add getGasEstimate for creating new MarketContract
// Ref: https://github.com/trufflesuite/truffle-contract/tree/web3-one-readme
