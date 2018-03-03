import contract from 'truffle-contract';

export function loadContracts({ web3 }, { MarketContractRegistry, MarketContract, MarketCollateralPool, CollateralToken }) {
  const type = 'GET_CONTRACTS';

  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    
    // Double-check web3's status
    if (web3 && typeof web3 !== 'undefined') {
      // Using truffle-contract create needed contract objects and set providers
      const marketContractRegistry = contract(MarketContractRegistry);
      marketContractRegistry.setProvider(web3.currentProvider);

      const marketContract = contract(MarketContract);
      marketContract.setProvider(web3.currentProvider);

      const marketCollateralPool = contract(MarketCollateralPool);
      marketCollateralPool.setProvider(web3.currentProvider);

      const collateralToken = contract(CollateralToken);
      collateralToken.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions.
      let marketContractRegistryInstance;
      marketContractRegistry.deployed().then(function(instance) {
        marketContractRegistryInstance = instance;
        console.log('Found the Market Contract Registry at' + instance.address);

        // Attempt to find deployed contracts and get metadata
        marketContractRegistryInstance.getAddressWhiteList
          .call()
          .then(async function(deployedContracts) {
            console.log('Found ' + deployedContracts.length + ' contracts deployed');
            await collateralToken.deployed();
            processContractsList(deployedContracts, marketContract, marketCollateralPool, collateralToken)
              .then(function (data) {
                console.log('Dispatch Contracts');
                dispatch({ type: `${type}_FULFILLED`, payload: data });
              });
          });
      });
    } else {
      dispatch({ type: `${type}_REJECTED`, payload: {'error': 'Web3 not initialised'} });
    }
  };
}

async function processContractsList(deployedContracts, marketContract, marketCollateralPool, baseToken) {
  let promises = deployedContracts.map(async (contract) => {
    return await marketContract
      .at(contract)
      .then(async function(instance) {
        const contractJSON = {};
        contractJSON['key'] = instance.address;
        contractJSON['CONTRACT_NAME'] = await instance.CONTRACT_NAME.call();
        let baseTokenContractAddress = await instance.BASE_TOKEN.call();
        contractJSON['BASE_TOKEN'] = baseTokenContractAddress;

        await baseToken
          .at(baseTokenContractAddress)
          .then(async function(baseTokenInstance) {
            contractJSON['BASE_TOKEN'] = await baseTokenInstance.name();
            contractJSON['BASE_TOKEN_SYMBOL'] = await baseTokenInstance.symbol();
          });

        contractJSON['PRICE_FLOOR'] = await instance.PRICE_FLOOR.call().then(data => data.toNumber());
        contractJSON['PRICE_CAP'] = await instance.PRICE_CAP.call().then(data => data.toNumber());
        contractJSON['PRICE_DECIMAL_PLACES'] = await instance.PRICE_DECIMAL_PLACES.call().then(data => data.toNumber());
        contractJSON['QTY_MULTIPLIER'] = await instance.QTY_MULTIPLIER.call().then(data => data.toNumber());
        contractJSON['ORACLE_QUERY'] = await instance.ORACLE_QUERY.call();
        contractJSON['EXPIRATION'] = await instance.EXPIRATION.call().then(data => data.toNumber());
        contractJSON['lastPrice'] = await instance.lastPrice.call().then(data => data.toNumber());
        contractJSON['isSettled'] = await instance.isSettled.call();

        await marketCollateralPool
          .at(await instance.marketCollateralPoolAddress.call())
          .then(async function(collateralPoolInstance) {
            contractJSON['collateralPoolBalance'] = await collateralPoolInstance.collateralPoolBalance.call().then(data => data.toNumber());
          });

        return contractJSON;
      });
  });

  return await Promise.all(promises);
}
