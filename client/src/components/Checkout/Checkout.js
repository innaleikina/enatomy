import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let billableTotal = this.props.amount * 100; 
    console.log(billableTotal);
    //console.log(typeof(billableTotal))
    let {token} = await this.props.stripe.createToken({name: "Name"});

    let url = "/charge/" + billableTotal;
    console.log(url);
    let response = await fetch(url , {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) console.log("Purchase Complete!")
  if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    console.log(this.props.amount)
    return (
    
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
