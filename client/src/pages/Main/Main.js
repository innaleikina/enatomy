import React, { Component } from 'react';
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import './main.css';
import AboutUs from "../../components/AboutUs";



class Main extends Component {

   

    render() {

        return (
         <div > 
           <AboutUs></AboutUs>
           <div className="formsContainer">
             <SignUp props={this.props} ></SignUp>
             <SignIn props={this.props} ></SignIn>
           </div>
        </div>
        )
      }
    };
    
    export default Main;