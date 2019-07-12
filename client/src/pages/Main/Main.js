import React, { Component } from 'react';
import AboutUs from "../../components/AboutUs";
import WhatIs from "../../components/WhatIs";
import HomeImage from "../../components/HomeImage";
import { Link } from 'react-router-dom';
import API from "../../utils/API";
// import image1 from "../../images/jaylynn.jpg"
// import image2 from "./images/sarah.jpg"
// import image3 from "./images/sarah-1jpg"
// import image4 from "./images/ty.jpg"





import './main.css';




class Main extends Component {

  state = {
    photosArr:[],
    fileNameArr:"",
    error:false,
    staticFilesArr:['jaylynn.jpg', 'sarah.jpg',
  'sarah-1.jpg', 'ty.jpg' ]

   }

   getFiles = () => {



    API.getFiles() 
      .then(res => this.setState({
        fileNameArr:res.data,
        error:false
      }),)
      .catch(err =>console.log(err), this.setState({
        error:true
      }))
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
     console.log(this.state.fileNameArr);
     console.log("main error is " + this.state.error);
    //  console.log(this.state.fileNameArr);
     let jpgFiles = [];
     let toRender = [];
     this.shuffle(this.state.fileNameArr);
    

     if(!this.state.error){
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