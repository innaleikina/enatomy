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
    staticFilesArr:['jaylynn.jpg', 'sarah.jpg',
  'sarah-1.jpg', 'ty.jpg' ]

   }

   getFiles = () => {

    this.setState({
      fileNameArr:[]
    })

    API.getFiles() 
      .then(res => this.setState({
        fileNameArr:res.data
      }))
      .catch(err =>console.log(err))
  };



  componentDidMount() {

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

     let jpgFiles = [];
     let toRender = [];
     this.shuffle(this.state.fileNameArr);

     if(this.state.fileNameArr.length !== 0) {
      //  console.log("not empty")
    for(var i=0; i < this.state.fileNameArr.length; i++){
      // console.log(this.state.fileNameArr[i]);
      if(this.state.fileNameArr[i].filename.endsWith("jpg")){
        // console.log("this is a jpg file " + this.state.fileNameArr[i].filename);
        jpgFiles.push( this.state.fileNameArr[i].filename); 
      }
    }
     
    
    for(var b =0; b < 4; b++){
      toRender.push(<Link key={b} to={`/set/${jpgFiles[b]}`}><HomeImage key={b} fileName={jpgFiles[b]}>
      </HomeImage></Link>) 
    }
    return toRender
   } else {
    // console.log("empty")

      let toRender = []
      let staticFilesArr = this.state.staticFilesArr;
      
 
     for(var c = 0; c < staticFilesArr.length; c++){
       toRender.push(<Link key={c} to={`/set/${staticFilesArr[c]}`}><HomeImage key={c} fileName={staticFilesArr[c]}>
       </HomeImage></Link>)
     }
     return toRender
 
   }
  }

    render() {
      // console.log(this.state.fileNameArr );
        return (
         <div > 
            <div className="home-image-container">
              <div className="images-inner">
                 {this.renderItems()}
              </div>
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