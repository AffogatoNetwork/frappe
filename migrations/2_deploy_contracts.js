var KyberNetworkProxy = artifacts.require("./KyberNetworkProxy.sol");
var Frappe = artifacts.require("./Frappe.sol");


module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts();
  deployer.deploy(KyberNetworkProxy, accounts[0]).then(function () {
    return deployer.deploy(Frappe, KyberNetworkProxy.address);
  });
};