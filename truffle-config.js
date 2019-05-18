
const path = require("path");
require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!compilers: {

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(process.env.ROPSTEN_PRIVATE_KEY, "https://strangely-sweet-dog.quiknode.io/c293d11b-4e62-445d-ab91-914aa8e912b0/sQszpG7Jpi4aA5aCYHxFxw==/")
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
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
