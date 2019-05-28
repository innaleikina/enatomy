import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import API from "../../utils/API";
import {Input, Button} from "../../components/Form"

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    username: "",
    role:"",
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role:this.state.role
      }
      API.createUser(newUser)
        .then(res => {alert("New user created.")})
        .then(API.sendWelcomeEmail(this.state.name, this.state.email))
        .catch(err => {alert("Please put in a valid email.")});
    } else {
      alert("Please fill in your name, email, and password.")
    }
  };

  
  // redirect = () => {
  //   this.props.fetchUser();
  //   API.fetchUser()
  //     .then(res => {
  //       if (res.data) {
  //         this.props.history.push("/myaccount");
  //       }
  //     })
  // };


  render() {
    return (
    <div className="signup-page">
      
          <form>
          <Input
              label="Name"
              id="name"
              placeholder="John Smith"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            >
            </Input>
            <Input
              label="Email"
              id="email"
              placeholder="John@Smith.com"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            >
            </Input>
            <Input
              label="Password"
              id="password"
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            >
            </Input>
            {/* <Input
              label="role"
              id="role"
              placeholder="role"
              name="role"
              type="role"
              value={this.state.role}
              onChange={this.handleInputChange}
            ></Input> */}
            <Button onClick={(event) => this.handleFormSubmit(event)}> Sign Up
            </Button>
       
          </form>
        </div>
    )
  }
};

export default SignUp;