import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import "./popup.css"
import SignIn from '../SignIn';
import SignUp from '../SignUp';




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
            
            {this.props.buttonClicked === "log in" ? <SignIn  fetchUser={this.props.fetchUser}></SignIn> : <div></div>}
            
            {this.props.buttonClicked === "sign up" ? <SignUp></SignUp> : <div></div>}
            
            {this.props.buttonClicked === "purchase" ? 
              this.props.paymentForm : <div></div>}
            {this.props.buttonClicked === "emptyCart" ? 
              this.props.emptyCart : <div></div>}

             {this.props.buttonClicked === "deleteUser" ? 
              this.props.deleteUser : <div></div>}

             {this.props.buttonClicked === "resetPass" ? 
              this.props.resetPass : <div></div>}

             {this.props.buttonClicked === "sendPassEmail" ? 
              this.props.sentPassEmail: <div></div>}        
          </div>
        </div>
    )
  }
};

export default PopUp;