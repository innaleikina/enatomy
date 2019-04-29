import React, { Component } from 'react';
// import API from "../../utils/API";
import CoverPhoto from '../../components/CoverPhoto';
// const config = require("../../config.json");
import API from "../../utils/API";
import "./store.css";
import { Link } from 'react-router-dom';





class Store extends Component {
  state = {
    fileNameArr:"",
    jpgFiles:""
   }

  getFiles = () => {
    API.getFiles() 
      .then(res => this.setState({
        fileNameArr:res.data
      }))
      .catch(err => console.log(err))
  };



  componentWillMount() {
    this.getFiles()
 }

 renderItems = () => {
   let jpgCoverShotsArr = []
  for(var i=0; i < this.state.fileNameArr.length; i++){
    // console.log(this.state.fileNameArr[i]);
    if(this.state.fileNameArr[i].filename.endsWith("jpg")){
      //console.log("this is a jpg file " + this.state.fileNameArr[i].filename);
      jpgCoverShotsArr.push(<Link to={`/set/${this.state.fileNameArr[i].filename}`}><CoverPhoto key={this.state.fileNameArr[i].filename} fileName={this.state.fileNameArr[i].filename}>
      </CoverPhoto></Link>)
    } else {
     // console.log("this is not a jpg file " + this.state.fileNameArr[i].filename)
    }
  }
  return jpgCoverShotsArr
 }
    
  render() {
//store will render a grid of store items 
// console.log(this.state.fileNameArr)

    return (
        <div >
          <h1> this is a store </h1>
          <div className="grid">
            {this.renderItems()}
          </div>
           
        </div>
    )
  }
};
export default Store