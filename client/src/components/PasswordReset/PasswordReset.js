import React, { Component } from 'react';
// import API from "../../utils/API";
import PopUp from "../PopUp";


class PasswordReset extends Component {

  state = {
    passResetClicked:false,
  }

  onPassResetClick = () => {
    console.log("pass reset clicked");
    this.setState({
      passResetClicked:true
    })
  }


  closePopUp = () => {
    this.setState({
       passResetClicked:false,
      })
 }

  render() {


    return (
             <div>
            <button onClick={this.onPassResetClick} className={this.props.cssClass}> {this.props.buttonText}</button>

            {this.state.passResetClicked ? <PopUp buttonClicked="resetPass" fetchUser={this.props.fetchUser} closePopUp={this.closePopUp} resetPass={
              <div>
              <span> Enter email to reset password </span>
                <form>
                  <label> email </label>
                  <input></input>
                </form>
              </div>
          
            }>
            
            </PopUp>: <div></div>}

            </div>


    

    )
  }
};

export default PasswordReset;