import React, { Component } from 'react';
import API from "../../utils/API";
// import { withRouter } from 'react-router-dom'
import {Input, Button} from "../../components/Form"
// import { Redirect} from "react-router-dom";
import "./signin.css";
import PasswordReset from '../../components/PasswordReset';






class SignIn extends Component {
  state = {
    email: "",
    username: "",
    passwordLogin: "",
    loggedIn:false,
    popUpOpen:false,
    alertMessage:"",
    allowed:true,
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //handling user login
  handleLogin = (event) => {
    event.preventDefault();
    // console.log("handling login")
    //if username and password inputs have been filled...
    if (this.state.username && this.state.passwordLogin) {
      const loginUser = {
        username: this.state.username,
        password: this.state.passwordLogin
      } 
      //hit the API file, getUser method and pass the login user information
      API.getUser(loginUser)
        .then(res => {
          if(typeof(res.data) === "string" ) {
            
            alert("Incorrect email or password.")
          } else if(res.data.confirmed) {
            // console.log(this.props)
            this.props.fetchUser();
            this.setState({
              loggedIn:true
            })               
            window.location.reload();

          } else if (!res.data.confirmed){
            //add logic to send  confirmation link email
            this.setState({
              allowed:false,
              alertMessage:"please confirm you account. And email has been sent"
            },  () => API.sendWelcomeEmail(res.data.name, res.data.email, res.data._id))    
          }})
        .catch(err => console.log(err));
    } else {
      alert("Please input both your email and password.") 
    }
  };


  render() {
  // if(this.state.loggedIn === true){
  //   return <Redirect to="/myaccount"/>
  // }
    return (
       <div >
         {!this.state.forgotPassword ? 
            this.state.allowed ?  
              <form className="sign-in-form">
                 <div className="input-continer">
                    <label className="label"> email </label>
                    <Input
                        className = "input"
                        id="username"
                        placeholder="john@smith.com"
                        type="email"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                      >
                      </Input>
                  </div>


                  <div className="input-continer">
                      <label className="label"> password </label>
                      <Input
                      className = "input"

                        id="passwordLogin"
                        placeholder="password"
                        name="passwordLogin"
                        type="password"
                        value={this.state.passwordLogin}
                        onChange={this.handleInputChange}
                      >
                      
                      </Input>
                  </div>
                  <Button className="form-button" onClick={(event) => this.handleLogin(event)}> Sign In </Button>
                  <PasswordReset  cssClass="pass-reset-btn" buttonText="forgot password?"> </PasswordReset>
                </form> : this.state.alertMessage : 
                         <div className="password-reset"> 
                                An email to reset your password has been sent.
                          </div>}
         
         


     </div>
   )
  }
};

export default SignIn;