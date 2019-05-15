import React, { Component } from 'react';
// import API from "../../utils/API";
import { Button} from "../Form"
import PopUp from "../PopUp";



class LogInSignUp extends Component {
    state = {
       buttonClicked :"none",
       popUpOpen:false
      }

    setLogInState = () => {
        this.setState({
            buttonClicked:"log in",
            popUpOpen:true
          })
    }
    
   
    handleLogInClick = () => {
       this.setLogInState()
    //    console.log("clicked")
    //       let popUp = document.getElementById("popUp");
    //       if (this.state.logInClicked === true) {
    //           popUp.style.display = "block";
    //       } else {
    //           popUp.style.display = "none";
    //       }
     }

     handleSignUpClick = () => {
     
     }

     closePopUp = () => {
        this.setState({
           popUpOpen:false
          })
     }


  render() {
    return (
        <div>
          <Button onClick={this.handleSignUpClick}> Sign Up</Button>
          <Button onClick={this.handleLogInClick}> Log In </Button>

          {this.state.popUpOpen? <PopUp closePopUp={this.closePopUp}></PopUp>: <div></div>}

        </div>
    );
  }
}
export default LogInSignUp;