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
        password: this.state.password
      }
      API.createUser(newUser)
        .then(res => {alert("New user created.")})
        .catch(err => {alert("Please put in a valid email.")});
    } else {
      alert("Please fill in your name, email, and password.")
    }
  };

  
//   redirect = () => {
//     this.props.fetchUser();
//     API.fetchUser()
//       .then(res => {
//         if (res.data) {
//           this.props.history.push("/home");
//         }
//       })
//   };


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
            <Button
            onClick={(event) => this.handleFormSubmit(event)}
            > Sign Up
            </Button>
       
          </form>
        </div>
    )
  }
};

export default SignUp;