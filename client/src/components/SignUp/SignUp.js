import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import API from "../../utils/API";
import {Input, Button} from "../../components/Form"
import "./signup.css";


class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    username: "",
    role:"",
    newUserId:""
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
        .then(res => this.setState({
           newUserId:res.data._id
        }))
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
    console.log("new user id: " + this.state.newUserId)
    return (
    <div className="signup-page">
      
          <form className="sign-up-form">
            <div className="input-continer">
                    <label className="label"> name </label>
                    <Input
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  >
                  </Input>
            </div>
           
            <div className="input-continer">
                <label className="label"> email</label>
                <Input
                  id="email"
                  placeholder="John@Smith.com"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                >
                </Input>
             </div>
           
           
             <div className="input-continer">
                    <label className="label"> password </label>
                    <Input
                      id="password"
                      placeholder="password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    >
                    </Input>
              </div>
            {/* <Input
              label="role"
              id="role"
              placeholder="role"
              name="role"
              type="role"
              value={this.state.role}
              onChange={this.handleInputChange}
            ></Input> */}
            <Button className="form-button" onClick={(event) => this.handleFormSubmit(event)}> Sign Up
            </Button>
       
          </form>
        </div>
    )
  }
};

export default SignUp;