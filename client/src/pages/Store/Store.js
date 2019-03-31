import React, { Component } from 'react';
// import API from "../../utils/API";
import StoreItem from '../../components/StoreItem';
// const config = require("../../config.json");
import API from "../../utils/API";





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
      jpgCoverShotsArr.push(<StoreItem key={i} fileName={this.state.fileNameArr[i].filename}>
      </StoreItem>)
    } else {
      console.log("this is not a jpg file " + this.state.fileNameArr[i].filename)
    }
  }
  return jpgCoverShotsArr
 }
    
  render() {
//store will render a grid of store items 
console.log(this.state.fileNameArr)

    return (
        <div >
          <h1> this is a store </h1>
       {this.renderItems()}
           
        </div>
    )
  }
};
export default Store