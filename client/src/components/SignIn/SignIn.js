import React, { Component } from 'react';
import API from "../../utils/API";
// import { withRouter } from 'react-router-dom'
import {Input, Button} from "../../components/Form"




class SignIn extends Component {
  state = {
    email: "",
    username: "",
    passwordLogin: ""
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
    console.log("handling login")
    //if username and password inputs have been filled...
    if (this.state.username && this.state.passwordLogin) {
      const loginUser = {
        username: this.state.username,
        password: this.state.passwordLogin
      }
      //hit the API file, getUser method and pass the login user information
      API.getUser(loginUser)
        .then(res => {
          if(typeof(res.data) === "string") {
            alert("Incorrect email or password.")
          } else {
            this.redirect()
          }})
        .catch(err => console.log(err));
    } else {
      alert("Please input both your email and password.") 
    }
  };

  redirect = () => {
    this.props.props.fetchUser();
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.props.props.history.push("/myaccount");
        }
      })
  };


  render() {

    return (
        <div className="signin-page">
      
        <form>


          <Input
              label="Email"
              id="username"
              placeholder="john@smith.com"
              type="email"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            >
            </Input>
            <Input
              label="Password"
              id="passwordLogin"
              placeholder="password"
              name="passwordLogin"
              type="password"
              value={this.state.passwordLogin}
              onChange={this.handleInputChange}
            >
            </Input>
            <Button
          
            onClick={(event) => this.handleLogin(event)}
            > Sign In
            </Button>
     
        </form>
      </div>
    )
  }
};

export default SignIn;