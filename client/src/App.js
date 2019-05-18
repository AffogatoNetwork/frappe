import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import "./App.css";
import Header from "./components/Header";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      let fm = new Fortmatic("pk_test_C6808B2B488687F6");
      let web3;
      // Post EIP-1102 update which MetaMask no longer injects web3
      if (window.ethereum) {
        // Use MetaMask provider
        web3 = new Web3(window.ethereum);
      } else {
        // Use Fortmatic provider
        web3 = new Web3(fm.getProvider());
      }

      // Legacy dApp browsers which web3 is still being injected
      if (typeof web3 !== "undefined") {
        // Use injected provider
        window.web3 = new Web3(web3.currentProvider);
      } else {
        // Use Fortmatic provider
        window.web3 = new Web3(fm.getProvider());
      }
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(web3);
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    const { accounts, contract } = this.state;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Header account={accounts[0]} web3={window.web3} contracts={contract} />
    );
  }
}

export default App;
