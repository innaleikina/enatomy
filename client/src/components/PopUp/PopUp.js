import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import "./popup.css"
import SignIn from '../SignIn';
import SignUp from '../SignUp';
// import API from "../../utils/API";
// import {Elements, StripeProvider} from 'react-stripe-elements';
// import CheckoutForm from "../../components/Checkout";



class PopUp extends Component {
  state = {
    buttonsShown:true,
    authed:false
  }







  render() {

    return (
        <div id="popUp" className="popUp">
          <button id="close-pop-up" onClick={this.props.closePopUp}> X </button>
          <div id="form">
            {this.props.buttonClicked === "log in" ? <SignIn fetchUser={this.props.fetchUser}></SignIn> : <div></div>}
            {this.props.buttonClicked === "sign up" ? <SignUp></SignUp> : <div></div>}
            {this.props.buttonClicked === "purchase" ? 
              this.props.paymentForm : <div></div>}
              {this.props.signIn === "signIn" ? this.props.signInMessage :<div></div>}
          </div>
        </div>
    )
  }
};

export default PopUp;