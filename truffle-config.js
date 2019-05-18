
const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!compilers: {

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    kovan: {
      provider: function () {
        return new HDWalletProvider(process.env.ROPSTEN_PRIVATE_KEY, "https://kovan.infura.io/v3/29ba9ffaf85e40a39f0aeea2361a8b88")
      },
      network_id: "*",
      skipDryRun: true //make sure this gas allocation isn't over 4M, which is the max
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
      websockets: true
    },
  },
  compilers: {
    solc: {
      version: "0.4.18"
    }
  }
};
