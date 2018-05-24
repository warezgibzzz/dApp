export default function createFormValidators(web3) {
  const RINKEBY = '4';

  return {
    ethAddressValidator(rule, value, callback) {
      if (!web3) {
        callback();
      } else {
        callback(web3.isAddress(value) ? undefined : 'Invalid ETH address');
      }
    },
    checkERC20Contract(value, callback) {
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
              } else if (
                res.includes('18160ddd') &&
                res.includes('70a08231') &&
                res.includes('dd62ed3e') &&
                res.includes('a9059cbb') &&
                res.includes('095ea7b3') &&
                res.includes('23b872dd')
              ) {
                callback(undefined);
              } else {
                callback('Not a valid ERC20 smart contract address');
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
    }
  };
}
