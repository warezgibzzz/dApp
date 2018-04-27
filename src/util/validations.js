const RINKEBY = '4';

/**
 * Checks the given address a contract or not.
 * @param web3
 * @param value
 * @param callback
 */
export const checkContract = function(web3, value, callback) {
  // If web3 isn't set up for some reason, we probably shouldn't block validation
  if (!web3 || !value) {
    callback();
  } else {
    /**
     * Default checkValue to use when checking smart contract getCode
     * Local - '0x0'
     * Rinkeby - '0x'
     */
    const checkValue = web3.version.network === RINKEBY ? '0x' : '0x0';

    try {
      web3.eth.getCode(value, function(err, res) {
        if (!err) {
          if (res === checkValue) {
            callback('Not a valid smart contract address');
          } else {
            callback(undefined);
          }
        } else {
          callback(err);
        }
      });
    } catch (error) {
      if (error.message === 'invalid address') {
        callback('Invalid Address');
      }
    }
  }
};
