import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import "./homeimage.css"



class HomeImage extends Component {







  render() {

    return (
       <div className="home-model-container"> <img alt="sample model" src={`https://s3.amazonaws.com/enatomy/${this.props.fileName}`} className="home-model" /></div>
         
    )
  }
};

export default HomeImage;