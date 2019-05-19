require("dotenv").config(); // Store environment-specific variable from '.env' to process.env
const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNENOMIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!compilers: {

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    kovan: {
      provider: function () {
        return new HDWalletProvider(process.env.ROPSTEN_PRIVATE_KEY, "https://kovan.infura.io/v3/29ba9ffaf85e40a39f0aeea2361a8b88")
      },
      network_id: 3,
      skipDryRun: true,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
      websockets: true
    },
    rinkeby: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(mnemonic, process.env.RINKEBY_API_URL),
      network_id: "4",
      skipDryRun: true
    }
  }
};
