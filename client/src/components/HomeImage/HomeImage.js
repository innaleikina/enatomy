import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import "./homeimage.css"



class HomeImage extends Component {







  render() {

    return (
       <div className="home-model-container"> <img alt="sample model" src={this.props.link} className="home-model" /></div>
         
    )
  }
};

export default HomeImage;