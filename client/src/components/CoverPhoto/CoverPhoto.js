import React, { Component } from 'react';
import "./coverphoto.css";
// import API from "../../utils/API";




class CoverPhoto extends Component {




    
  render() {
    return (
        <div >
         <img id={this.props.id} alt="model" data-id={this.props.fileName} className="image" src={`https://s3.amazonaws.com/enatomy/${this.props.fileName}`}/>
        </div>
       
    )
  }
};
export default CoverPhoto;