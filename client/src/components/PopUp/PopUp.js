import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import "./popup.css"
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import API from "../../utils/API";



class PopUp extends Component {
  state = {
    buttonsShown:true,
    authed:false
  }







  render() {

    return (
        <div id="popUp" className="popUp">
          <button onClick={this.props.closePopUp}> X </button>
          {this.props.buttonClicked === "log in" ? <SignIn fetchUser={this.props.fetchUser}></SignIn> : <div></div>}
          {this.props.buttonClicked === "sign up" ? <SignUp   ></SignUp> : <div></div>}

        </div>
    )
  }
};

export default PopUp;