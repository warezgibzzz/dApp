export default function createFormValidators(web3) {
  return {
    ethAddressValidator(rule, value, callback) {
      if (!web3) {
        callback();
      } else {
        callback(web3.isAddress(value) ? undefined : 'Invalid ETH address');
      }
    }
  };
}