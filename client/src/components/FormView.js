import React, { Component } from "react";
import { Container, Col, Row, Form, FormGroup } from "reactstrap";
import { Heading, Field, Input, Button, Card, OutlineButton } from "rimble-ui";

class FormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disabled: true
    };
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChangeAmount(event) {
    let disabled = false;
    if (
      event.target.value == "0" ||
      event.target.value == "" ||
      parseInt(event.target.value, 10) == 0
    ) {
      disabled = true;
    }
    this.setState({ amount: event.target.value, disabled });
  }

  async onFormSubmit(event) {
    event.preventDefault();
    let url = `https://verify.testwyre.com/widget/v1?env=test&operation=debitcard&accountId=AC_1234&authType=secretKey&destCurrency=ETH&sourceCurrency=USD&sourceAmount=${
      this.state.amount
    }&dest=ethereum:${this.props.account}&redirectUrl=https://sendwyre.com`;
    window.open(url, "_blank");
  }

  render() {
    return (
      <>
        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col lg="6">
              <Heading.h2>Buy</Heading.h2>
              <Card className="mt-4 mx-auto">
                <Form className="form" onSubmit={this.onFormSubmit}>
                  <FormGroup>
                    <Field label="USD Amount">
                      <Input
                        placeholder="0"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChangeAmount}
                        required={true}
                        width={"100%"}
                      />
                    </Field>
                  </FormGroup>
                  <Button disabled={this.state.disabled} icon="AttachMoney">
                    Select Amount
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default FormView;
