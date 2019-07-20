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
    newUserId:"",
    resCheckUser: ""
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
      }
      API.checkUser(newUser)
        .then(res =>    
        this.setState({
          userSuccessPopUp:true,
          resCheckUser: res
        }), () => API.sendWelcomeEmail(this.state.name, this.state.email, this.state.resCheckUser.data._id)
         )
        .catch(err => console.log(err))
        
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
    console.log(this.state.resCheckUser)
    return (
 <div className="signup-page">
         {!this.state.userSuccessPopUp ?
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
       
          </form> : <div className="success-msg-container"> 
                      <p className="success-msg">{this.state.resCheckUser.data.signUpMessage}</p> 
                    </div>}
        </div>
    )
  }
};

export default SignUp;