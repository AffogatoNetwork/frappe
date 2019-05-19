import React, { Component } from "react";
import { Container, Col, Row, Form, FormGroup } from "reactstrap";
import { Heading, Field, Input, Button, Card, Avatar } from "rimble-ui";

class TipForm extends Component {
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
    }&dest=ethereum:0x930A7CD60A633128B7c5181307781e6d033BA51a&redirectUrl=https://sendwyre.com`;
    window.open(url, "_blank");
  }

  render() {
    return (
      <>
        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col lg="6">
              <Heading.h2>Send a Tip</Heading.h2>

              <Card className="mt-4 mx-auto">
                <Avatar
                  className=" mx-auto mb-4"
                  size="150px"
                  src="https://www.coffeedetective.com/images/coffee-farmer.jpg"
                />
                <text className="mt-4">
                  The best coffee experience was born in the shadows of the Três
                  Pontas Mountains in Brazil with the benefits of using
                  fair-trade standards. Our premium-quality coffee is named Três
                  Pontas out of respect for the ideal geographical requirements
                  for coffee bean cultivation in Brazil and the single-farm
                  source we use that resides there.
                </text>
                <Form className="form mt-4" onSubmit={this.onFormSubmit}>
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
                    Send Tip
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

export default TipForm;
