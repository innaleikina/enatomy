import React, { Component } from 'react';
// import API from "../../utils/API";
import { Button} from "../Form"
import PopUp from "../PopUp";



class LogInSignUp extends Component {
    state = {
       buttonClicked :"none",
       popUpOpen:false
      }

    handleLogIn = () => {
        this.setState({
            buttonClicked:"log in",
            popUpOpen:true
          })
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


  render() {
      console.log(this.state.buttonClicked)
    return (
        <div>
          <Button onClick={this.handleSignUp}> Sign Up</Button>
          <Button onClick={this.handleLogIn}> Log In </Button>

          {this.state.popUpOpen? <PopUp buttonClicked={this.state.buttonClicked} closePopUp={this.closePopUp}></PopUp>: <div></div>}

        </div>
    );
  }
}
export default LogInSignUp;