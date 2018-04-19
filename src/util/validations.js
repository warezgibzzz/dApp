/**
 * Checks the given  address a contract or not.
 * @param web3
 * @param value
 * @param callback
 */


const checkContract = function(web3, value, callback) {
  // If web3 isn't set up for some reason, we probably shouldn't block validation
  if (!web3) {
    callback();
  } else {
    try {
      // If using local just change the '0x' to '0x0'
      callback(web3.eth.getCode(value) === '0x' ? 'Not a valid smart contract address': undefined );
    }
    catch (error) {
      if (error.message === 'invalid address') {
        callback(undefined);
      } else {
        callback(error.message);
      }
    }
  }
};

export { checkContract };

