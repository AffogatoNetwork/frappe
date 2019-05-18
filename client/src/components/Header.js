import React, { Component } from "react";
import { Alert, Nav, NavItem } from "reactstrap";
import Blockies from "react-blockies";
import { Link, Icon } from "rimble-ui";

class Header extends Component {
  constructor(props) {
    super(props);
    const { web3, contracts, account } = this.props;
    this.state = {
      web3: web3,
      contracts: contracts,
      account: account,
      hasBalance: false,
      balance: 0,
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this.hasBalance();
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  async hasBalance() {
    var balance = await this.state.web3.eth.getBalance(this.state.account);
    balance = this.state.web3.utils.fromWei(balance, "ether");
    var hasBalance = balance > 0 ? true : false;
    this.setState({ hasBalance, balance });
  }

  render() {
    return (
      <>
        <Alert
          color="warning"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          ⚠️ This is a non audited Hackathon Demo! We recommend to use it on{" "}
          <b>Rinkeby</b>
        </Alert>
        <Nav className="mt-4 justify-content-end">
          <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
            <Link href="/" color="secondary">
              <span>
                <Icon name="Home" size="20" className="mr-1" />
                Home
              </span>
            </Link>
          </NavItem>
          <NavItem className="ml-2 mr-4 mt-4 pt-1 text-left ">
            <Icon
              name="AccountBalanceWallet"
              size="20"
              className="mr-1"
              color="primary"
            />
            Balance: {this.state.balance} ETH
          </NavItem>
          <NavItem className="ml-2 mt-1 text-right">
            <b>Current Account:</b> <br />
            <label>{this.state.account}</label>
          </NavItem>
          <NavItem className="ml-2 mr-4">
            <Blockies seed={this.state.account} size={10} scale={5} />
          </NavItem>
        </Nav>
      </>
    );
  }
}

export default Header;
