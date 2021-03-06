import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import API from "../../utils/API";
import "./checkout.css";



class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        complete: false,
        // cart: this.props.cartItems
    };
    this.submit = this.submit.bind(this);
  }

  addToPurchased = () => {
      console.log("running add to purchased");
      console.log(this.props.cartItems)
      for(var i=0; i < this.props.cartItems.length; i++){
          console.log(this.props.cartItems[i])
       API.addToPurchased(this.props.userId, this.props.cartItems[i])
       .catch(err => console.log(err));
      }
  }

  async submit(ev) {
    let billableTotal = this.props.amount * 100; 
    let {token} = await this.props.stripe.createToken({name: "Name"});

    let url = "/charge/" + billableTotal;
    console.log(url);
    let response = await fetch(url , {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });
  // if (response.ok) this.addToPurchased();
  // if (response.ok) this.props.downloadAllSets();


  // if (response.ok) console.log("Purchase Complete!")
  // if (response.ok) this.setState({complete: true});


  if(response.ok){
    this.addToPurchased();
    this.props.downloadAllSets();
    console.log("Purchase Complete!")
    this.setState({complete: true});
  }
  }

  render() {
    //   console.log(this.props)
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    // console.log(this.props.amount)
    return (
    
      <div className="checkout">
        <p className="checkout-text">Please enter your credit card number</p>
        <CardElement />
        <button className="complete-btn" onClick={this.submit}>Complete</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
