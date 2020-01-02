import React, { Component } from 'react';
import API from "../../utils/API";
import PopUp from "../PopUp";
import "./passreset.css"
const crypto = require('crypto');


class PasswordReset extends Component {

  state = {
    passResetClicked:false,
    email:"",
    user:"",
    token:"11",
    emailSent:false,
    message:""

  }
  componentDidMount() {
    this.generateToken()
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

 generateToken = () => { crypto.randomBytes(16, (err, buf) => {
  if (err) throw err;
  // console.log(`${buf.toString('hex')}`);
  this.setState({
    token: buf.toString('hex')
  })
});
}

 onSendEmailClick = () => {
  // console.log(this.state.email)
  API.findUserByEmail(this.state.email).then(
    res => {
      if (res.data) {
        this.setState({
          message:"if this user exists the email has been sent",
          emailSent:true

        })
    }

    API.addToken(res.data._id,  this.state.token).then(
      res=> {
        if(res.data){
          console.log(res.data + " token is set")
  
        }
      });



       // let cleanPassHash = passHash.replace(/\//g, "")
        // console.log(cleanPassHash)
        API.sendPassReset(res.data.name, res.data.email, res.data._id, this.state.token ).then(
          res=> {
            if(res.data){
              console.log(res.data + " data that email has been sent ")
      
            }
          });
      })
 }


  render() {
    // this.generateToken()
   console.log(this.state.token)
    return (
             <div>
            <button onClick={this.onPassResetClick} className={this.props.cssClass}> {this.props.buttonText}</button>

            {this.state.passResetClicked ? !this.state.emailSent ? <PopUp buttonClicked="resetPass" fetchUser={this.props.fetchUser} closePopUp={this.closePopUp} resetPass={
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
            
            </PopUp>: <PopUp buttonClicked="sendPassEmail" closePopUp={this.closePopUp} sentPassEmail={this.state.message}></PopUp> : <div> </div>}

            </div>


    

    )
  }
};

export default PasswordReset;