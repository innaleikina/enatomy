import React, { Component } from 'react';
import API from "../../utils/API";


class PasswordReset extends Component {
  state = {
    user:"",

  }

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.setState({
            user: res.data,
          })
      }
    })
  };

  componentDidMount() {

    this.fetchUser();

  };


  onPassResetClick = () => {
    console.log("pass reset clicked")
   API.sendPassReset(this.state.user.name, this.state.user.email, this.state.user._id)
  }






  render() {


    return (
  
            <button onClick={this.onPassResetClick} className={this.props.cssClass}> {this.props.buttonText}</button>
    

    )
  }
};

export default PasswordReset;