
const path = require("path");


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!compilers: {

contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  works: {
    
      evelopment: {
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
