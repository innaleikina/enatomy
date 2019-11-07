import React, { Component } from 'react';
import API from "../../utils/API";
import PopUp from "../PopUp";


class PasswordReset extends Component {

  state = {
    passResetClicked:false,
    email:"",
    user:"",
    token:""

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

 onSendEmailClick = () => {
  // console.log(this.state.email)
  API.findUserByEmail(this.state.email).then(
    res => {
      if (res.data) {
        // this.setState({
        //   user:res.data,
        //   token:res.data.passwordHash.concat(res.data.created_at)
        // console.log(res.data.passwordHash)
        // console.log(res.data.created_at)
        let passHash = res.data.passwordHash.concat(res.data.created_at)
        let cleanPassHash = passHash.replace(/\//g, "")
        console.log(cleanPassHash)
        API.sendPassReset(res.data.name, res.data.email, res.data._id, cleanPassHash )
      }
    }
  )
 }


  render() {
  //  console.log(this.state.token)

    return (
             <div>
            <button onClick={this.onPassResetClick} className={this.props.cssClass}> {this.props.buttonText}</button>

            {this.state.passResetClicked ? <PopUp buttonClicked="resetPass" fetchUser={this.props.fetchUser} closePopUp={this.closePopUp} resetPass={
              <div>
              <span> Enter email to reset password </span>
                <form>
                  <label> email </label>
                  <input 
                     id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}></input>
                </form>
                <button onClick={this.onSendEmailClick}> send email </button>
              </div>
          
            }>
            
            </PopUp>: <div></div>}

            </div>


    

    )
  }
};

export default PasswordReset;