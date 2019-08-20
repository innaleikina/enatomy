import React, { Component } from 'react';
import "./artimage.css";
// import API from "../../utils/API";




class ArtImage extends Component {




    
  render() {
    return (
        <div >
         <img alt="art" data-id={this.props.fileName} className="image-art" src={`https://enatomy-home.s3.amazonaws.com/${this.props.fileName}`}/>
        </div>
       
    )
  }
};
export default ArtImage;