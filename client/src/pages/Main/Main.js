import React, { Component } from 'react';
import AboutUs from "../../components/AboutUs";
import WhatIs from "../../components/WhatIs";
import HomeImage from "../../components/HomeImage";


import './main.css';




class Main extends Component {

  state = {
    photosArr:[]

   }

    render() {
        return (
         <div > 
            <div className="home-image-container">
              <HomeImage link="https://enatomy-home.s3.amazonaws.com/home-1.png"></HomeImage>
              <HomeImage link="https://enatomy-home.s3.amazonaws.com/home-2.jpg"></HomeImage>
              <HomeImage link="https://enatomy-home.s3.amazonaws.com/home-3.png"></HomeImage>
              <HomeImage link="https://enatomy-home.s3.amazonaws.com/home-4.png"></HomeImage>
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