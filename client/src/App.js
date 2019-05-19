import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import Fortmatic from "fortmatic";
import "./App.css";
import Header from "./components/Header";
import FormView from "./components/FormView.js";
import TipForm from "./components/TipForm";
import { Container, Col, Row, Form, FormGroup } from "reactstrap";
import { Heading, Field, Input, Button, Card, OutlineButton } from "rimble-ui";
import FortmaticLogin from "./components/FortmaticLogin.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null
    };

    this.setFortmatic = this.setFortmatic.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();
      let fm = new Fortmatic("pk_test_C6808B2B488687F6", "kovan");
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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(web3);
      this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  async setFortmatic(event) {
    let fm = new Fortmatic("pk_test_C6808B2B488687F6", "kovan");
    let web3;
    // Post EIP-1102 update which MetaMask no longer injects web3

    web3 = new Web3(fm.getProvider());

    // Legacy dApp browsers which web3 is still being injected

    window.web3 = new Web3(fm.getProvider());
    // U/se web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    this.setState({ web3, accounts });
    console.log(accounts);
    // Get the contract instance.
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    console.log(web3);
  }

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
    console.log(accounts);
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (!accounts[0]) {
      return (
        <>
          <Container className="mt-4">
            <Row className="justify-content-center">
              <Col lg="6">
                <Heading.h2>Missing Web3 Provider</Heading.h2>
                <Card className="mt-4 mx-auto">
                  <Heading.h4>Login with Google</Heading.h4>
                  <p>
                    Login with Google pressing the blue button in the left
                    corner and then refresh the website
                  </p>
                </Card>
                <Card className="mt-4 mx-auto">
                  <Heading.h4>Login with Fortmatic</Heading.h4>
                  <p>Press the button and use your cellphone to login</p>
                  <Button onClick={this.setFortmatic}>
                    Login with Fortmatic
                  </Button>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
    return (
      <>
        <Header account={accounts[0]} web3={window.web3} contracts={contract} />
        <FormView account={accounts[0]} />
        <TipForm />
      </>
    );
  }
}

export default App;
