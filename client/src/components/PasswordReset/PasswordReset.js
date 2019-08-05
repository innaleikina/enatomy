import React, { Component } from 'react';

// import API from "../../utils/API";


class PasswordReset extends Component {
  state = {
    buttonsShown:true,
    authed:false
  }







  render() {


    return (
  
            <button className={this.props.cssClass}> {this.props.buttonText}</button>
    

    )
  }
};

export default PasswordReset;