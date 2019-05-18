pragma solidity 0.4.18;

import "./ERC20Interface.sol";
import "./KyberNetworkProxy.sol";

contract Frappe is ERC20Interface {

    // Variables
    KyberNetworkProxy public kyberNetworkProxyContract;

    // Events
    event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken);

    /**
    * @dev Contract constructor
    * @param _kyberNetworkProxyContract KyberNetworkProxy contract address
    */
    function MyContract(KyberNetworkProxy _kyberNetworkProxyContract) public {
        kyberNetworkProxyContract = _kyberNetworkProxyContract;
    }


    /**
    * @dev Gets the conversion rate for the destToken given the srcQty.
    * @param srcToken source token contract address
    * @param srcQty amount of source tokens
    * @param destToken destination token contract address
    */
    function getConversionRates(
        ERC20 srcToken,
        uint srcQty,
        ERC20 destToken) public view returns (uint, uint) {
        return kyberNetworkProxyContract.getExpectedRate(srcToken, destToken, srcQty);
    }


    /**
    * @dev Swap the user's ERC20 token to another ERC20 token/ETH
    * @param srcToken source token contract address
    * @param srcQty amount of source tokens
    * @param destToken destination token contract address
    * @param destAddress address to send swapped tokens to
    * @param maxDestAmount max destination amount to swap
    */
    function executeSwap(
        ERC20 srcToken,
        uint srcQty,
        ERC20 destToken,
        address destAddress,
        uint maxDestAmount
    ) public {
        uint minConversionRate;

        // Check that the token transferFrom has succeeded
        require(srcToken.transferFrom(msg.sender, address(this), srcQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(srcToken.approve(address(kyberNetworkProxyContract), 0));

        // Set the spender's token allowance to tokenQty
        require(srcToken.approve(address(kyberNetworkProxyContract), srcQty));

        // Get the minimum conversion rate
        (minConversionRate,) = kyberNetworkProxyContract.getExpectedRate(srcToken, destToken, srcQty);

        // Swap the ERC20 token and send to destAddress
        kyberNetworkProxyContract.trade(
            srcToken,
            srcQty,
            destToken,
            destAddress,
            maxDestAmount,
            minConversionRate,
            0 //walletId for fee sharing program
        );

        // Log the event
        Swap(msg.sender, srcToken, destToken);
    }
}
