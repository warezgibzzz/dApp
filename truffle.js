module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      network_id: 4,
      gasPrice: 3000000000 // Specified in Wei
    }
  }
};
