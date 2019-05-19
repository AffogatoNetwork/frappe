import React, { Component } from "react";
import { Container, Col, Row, Form, FormGroup } from "reactstrap";
import { Heading, Field, Input, Button, Card, OutlineButton } from "rimble-ui";
import Web3 from "web3";
import Fortmatic from "fortmatic";

class FortmaticLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disabled: true
    };
  }

  async setFortmatic(event) {
    let fm = new Fortmatic("pk_test_C6808B2B488687F6", "kovan");
    let web3;
    // Post EIP-1102 update which MetaMask no longer injects web3

    web3 = new Web3(fm.getProvider());

    // Legacy dApp browsers which web3 is still being injected

    window.web3 = new Web3(fm.getProvider());
    // U/se web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    // Get the contract instance.
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    console.log(web3);
  }

  render() {
    return (
      <>
        <Button onClick={this.setFortmatic}>Login with Fortmatic</Button>
      </>
    );
  }
}

export default FortmaticLogin;
