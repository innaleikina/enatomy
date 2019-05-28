import React, { Component } from 'react';
import API from "../../utils/API";
import { Button} from "../Form"
import PopUp from "../PopUp";



class LogInSignUp extends Component {
    state = {
       buttonClicked :"none",
       popUpOpen:false,
       buttonsShown:true
      }

    handleLogIn = () => {
        this.setState({
            buttonClicked:"log in",
            popUpOpen:true
          },)
    }

    handleSignUp = () => {
        this.setState({
            buttonClicked:"sign up",
            popUpOpen:true
          })
    }
    
       closePopUp = () => {
        this.setState({
           popUpOpen:false,
           buttonClicked:"none",

          })
     }


 logInSignUpButtons = () => {
    // this.setState({
    //   buttonsShown:false
    // })
    let logInBtn = document.getElementById("signUpBtn");
    let signUpBtn = document.getElementById("logInBtn");

    if (this.state.buttonsShown === true) {
      logInBtn.style.display = "block";
      signUpBtn.style.display = "block";
    } else {
      logInBtn.style.display = "none";
      signUpBtn.style.display = "none";
    }
  };

  hideBtns= () => {
     this.setState({
        buttonsShown:false
      }, this.logInSignUpButtons)
     
 
  };


  render() {
    console.log(this.props)
    return (
        <div>
          <Button onClick={this.handleSignUp} id="signUpBtn"> Sign Up</Button>
          <Button onClick={this.handleLogIn} id="logInBtn"> Log In </Button>

          {this.state.popUpOpen? <PopUp fetchUser={this.props.fetchUser}  buttonClicked={this.state.buttonClicked} closePopUp={this.closePopUp}></PopUp>: <div></div>}

        </div>
    );
  }
}
export default LogInSignUp;