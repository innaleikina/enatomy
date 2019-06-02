import React, { Component } from 'react';
import AboutUs from "../../components/AboutUs";
import WhatIs from "../../components/WhatIs";
import HomeImage from "../../components/HomeImage";
import { Link } from 'react-router-dom';
import API from "../../utils/API";



import './main.css';




class Main extends Component {

  state = {
    photosArr:[],
    fileNameArr:"",

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


 shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



   renderItems = () => {
    //  console.log(this.state.fileNameArr);
     let jpgCoverShotsArr = []
     this.shuffle(this.state.fileNameArr);
    
    for(var i=0; i < this.state.fileNameArr.length; i++){
      // console.log(this.state.fileNameArr[i]);
      if(this.state.fileNameArr[i].filename.endsWith("jpg")){
        //console.log("this is a jpg file " + this.state.fileNameArr[i].filename);
        jpgCoverShotsArr.push(<Link key={this.state.fileNameArr[i].filename} to={`/set/${this.state.fileNameArr[i].filename}`}><HomeImage key={this.state.fileNameArr[i].filename} fileName={this.state.fileNameArr[i].filename}>
        </HomeImage></Link>)
      } else {
       // console.log("this is not a jpg file " + this.state.fileNameArr[i].filename)
      }
    }
    return jpgCoverShotsArr
   }

    render() {
        return (
         <div > 
            <div className="home-image-container">
            {this.renderItems()}
            </div>
            <div className="about-container">
             <AboutUs></AboutUs>
             <WhatIs></WhatIs>
           </div>
        </div>
        )
      }
    };
    
    export default Main;