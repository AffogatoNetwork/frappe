var ethers = require("ethers");
var Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/29ba9ffaf85e40a39f0aeea2361a8b88")
);
var utils = web3.utils;

const ERC20ABI = [
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "supply", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "digits", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_owner", type: "address" },
      { indexed: true, name: "_spender", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  }
];
const kyberNetworkProxyABI = [
  {
    constant: false,
    inputs: [{ name: "alerter", type: "address" }],
    name: "removeAlerter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "enabled",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "pendingAdmin",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getOperators",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "srcAmount", type: "uint256" },
      { name: "dest", type: "address" },
      { name: "destAddress", type: "address" },
      { name: "maxDestAmount", type: "uint256" },
      { name: "minConversionRate", type: "uint256" },
      { name: "walletId", type: "address" },
      { name: "hint", type: "bytes" }
    ],
    name: "tradeWithHint",
    outputs: [{ name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "token", type: "address" },
      { name: "srcAmount", type: "uint256" },
      { name: "minConversionRate", type: "uint256" }
    ],
    name: "swapTokenToEther",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "sendTo", type: "address" }
    ],
    name: "withdrawToken",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "maxGasPrice",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newAlerter", type: "address" }],
    name: "addAlerter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "kyberNetworkContract",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "user", type: "address" }],
    name: "getUserCapInWei",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "srcAmount", type: "uint256" },
      { name: "dest", type: "address" },
      { name: "minConversionRate", type: "uint256" }
    ],
    name: "swapTokenToToken",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newAdmin", type: "address" }],
    name: "transferAdmin",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "claimAdmin",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "token", type: "address" },
      { name: "minConversionRate", type: "uint256" }
    ],
    name: "swapEtherToToken",
    outputs: [{ name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newAdmin", type: "address" }],
    name: "transferAdminQuickly",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getAlerters",
    outputs: [{ name: "", type: "address[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "src", type: "address" },
      { name: "dest", type: "address" },
      { name: "srcQty", type: "uint256" }
    ],
    name: "getExpectedRate",
    outputs: [
      { name: "expectedRate", type: "uint256" },
      { name: "slippageRate", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "user", type: "address" },
      { name: "token", type: "address" }
    ],
    name: "getUserCapInTokenWei",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newOperator", type: "address" }],
    name: "addOperator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_kyberNetworkContract", type: "address" }],
    name: "setKyberNetworkContract",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "operator", type: "address" }],
    name: "removeOperator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "field", type: "bytes32" }],
    name: "info",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "srcAmount", type: "uint256" },
      { name: "dest", type: "address" },
      { name: "destAddress", type: "address" },
      { name: "maxDestAmount", type: "uint256" },
      { name: "minConversionRate", type: "uint256" },
      { name: "walletId", type: "address" }
    ],
    name: "trade",
    outputs: [{ name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "sendTo", type: "address" }
    ],
    name: "withdrawEther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "token", type: "address" },
      { name: "user", type: "address" }
    ],
    name: "getBalance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_admin", type: "address" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "trader", type: "address" },
      { indexed: false, name: "src", type: "address" },
      { indexed: false, name: "dest", type: "address" },
      { indexed: false, name: "actualSrcAmount", type: "uint256" },
      { indexed: false, name: "actualDestAmount", type: "uint256" }
    ],
    name: "ExecuteTrade",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "newNetworkContract", type: "address" },
      { indexed: false, name: "oldNetworkContract", type: "address" }
    ],
    name: "KyberNetworkSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "sendTo", type: "address" }
    ],
    name: "TokenWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "sendTo", type: "address" }
    ],
    name: "EtherWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "pendingAdmin", type: "address" }],
    name: "TransferAdminPending",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "newAdmin", type: "address" },
      { indexed: false, name: "previousAdmin", type: "address" }
    ],
    name: "AdminClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "newAlerter", type: "address" },
      { indexed: false, name: "isAdd", type: "bool" }
    ],
    name: "AlerterAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "newOperator", type: "address" },
      { indexed: false, name: "isAdd", type: "bool" }
    ],
    name: "OperatorAdded",
    type: "event"
  }
];

var kyberNetworkProxyContract = null;

var KYBER_NETWORK_PROXY_ADDRESS = null;
const KYBER_NETWORK_ADDRESS = "0x91a502C678605fbCe581eae053319747482276b9";
const KYBER_NETWORK_ROPSTEN_CONTRACT_ADDRESS = "0x118A7b23B7a2e6A57963d017A7E76A4E2636F075";
const ETH_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const KNC_TOKEN_ADDRESS = "0x118A7b23B7a2e6A57963d017A7E76A4E2636F075";
const USER_ACCOUNT = "0x53C5438E8C825ba574865B4c1CCB34e74B3AFfdf";
const ETH_DECIMALS = 18;
const KNC_DECIMALS = 18;

const VENDOR_WALLET_ADDRESS = "0x483C5100C3E544Aef546f72dF4022c8934a6945E";
const PRODUCT_ETH_PRICE = "0.3";
const PRODUCT_ETH_WEI_PRICE = utils.toWei(PRODUCT_ETH_PRICE);

async function main() {
  KYBER_NETWORK_PROXY_ADDRESS = await getKyberNetworkProxyAddress();
  kyberNetworkProxyContract = new web3.eth.Contract(
    kyberNetworkProxyABI,
    KYBER_NETWORK_PROXY_ADDRESS
  );

  /*
    ######################################################
    ### OBTAINING & DISPLAYING SINGLE TOKEN PAIR RATE ####
    ######################################################
    */
  console.log(kyberNetworkProxyContract.methods.getExpectedRate);
  console.log("ETH_TOKEN_ADDRESS => " + ETH_TOKEN_ADDRESS);
  console.log("KNC_TOKEN_ADDRESS => " + KNC_TOKEN_ADDRESS);
  console.log("PRODUCT_ETH_WEI_PRICE => " + PRODUCT_ETH_WEI_PRICE);
  let result = await kyberNetworkProxyContract.methods
    .getExpectedRate(
      ETH_TOKEN_ADDRESS,
      KNC_TOKEN_ADDRESS,
      PRODUCT_ETH_WEI_PRICE
    )
    .call();
  let expectedRate = result.expectedRate;
  let slippageRate = result.slippageRate;
  console.log("Expected Rate: " + expectedRate);
  console.log("Slippage Rate: " + slippageRate);

  //Convert expected rate and / or slippage rate to KNC for user to view
  userTokenWeiPrice = convertToUserTokenWeiPrice(
    Number(PRODUCT_ETH_PRICE),
    expectedRate
  );
  userTokenPrice = convertToTokenPrice(userTokenWeiPrice, KNC_DECIMALS);
  console.log("Product price: " + userTokenPrice + " KNC");

  /*
    ########################
    ### TRADE EXECUTION ####
    ########################
    */

  //User can pay in KNC (src), but we receive payment in ETH (dest)
  //First, user must approve KyberNetwork contract to trade src tokens
  srcTokenContract = new web3.eth.Contract(ERC20ABI, KNC_TOKEN_ADDRESS);
  transactionData = srcTokenContract.methods
    .approve(KYBER_NETWORK_PROXY_ADDRESS, userTokenWeiPrice)
    .encodeABI();
  txReceipt = await web3.eth
    .sendTransaction({
      from: USER_ACCOUNT, //obtained from website interface Eg. Metamask, Ledger etc.
      to: srcTokenContract,
      data: transactionData
    })
    .catch(error => console.log(error));

  transactionData = KyberNetworkProxyContract.methods
    .trade(
      KNC_TOKEN_ADDRESS, //ERC20 srcToken
      userTokenWeiPrice, //uint srcAmount
      ETH_TOKEN_ADDRESS, //ERC20 destToken
      VENDOR_WALLET_ADDRESS, //address destAddress
      57896044618658097711785492504343953926634992332820282019728792003956564819968, //uint maxDestAmount
      slippageRate, //uint minConversionRate
      0 //uint walletId
    )
    .encodeABI();

  txReceipt = await web3.eth
    .sendTransaction({
      from: USER_ACCOUNT, //obtained from website interface Eg. Metamask, Ledger etc.
      to: KYBER_NETWORK_PROXY_ADDRESS,
      data: transactionData
    })
    .catch(error => console.log(error));
}

function getKyberNetworkProxyAddress() {
    return "0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D";
//   var providers = ethers.providers;
//   console.log(providers);
//   var provider;
//   try {
//     provider = ethers.getDefaultProvider('ropsten');
//   } catch(e) {
//       console.error(e);
//       exit();
//   }
//   var address = await provider
//     .resolveName("kybernetwork.eth")
//     .catch(error => console.log(error));
//   if (!address) {
//     address = KYBER_NETWORK_ROPSTEN_CONTRACT_ADDRESS;
//   }
//   return address;
}

function convertToUserTokenWeiPrice(productSrcPrice, expectedRate) {
  return productSrcPrice * expectedRate;
}

function convertToTokenPrice(userTokenWeiPrice, destDecimals) {
  return userTokenWeiPrice / 10 ** destDecimals;
}

main();