import React, { Component } from 'react';
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import './main.css';
import AboutUs from "../../components/AboutUs";



class Main extends Component {

  state = {
    photosArr:[]

   }

    render() {
        return (
         <div > 
           <AboutUs></AboutUs>
           <div className="formsContainer">
             {/* <SignUp allProps={this.props} ></SignUp>
             <SignIn allProps={this.props} ></SignIn> */}
           </div>
        </div>
        )
      }
    };
    
    export default Main;