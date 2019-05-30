import React, { Component } from 'react';
import AboutUs from "../../components/AboutUs";
import WhatIs from "../../components/WhatIs";

import './main.css';




class Main extends Component {

  state = {
    photosArr:[]

   }

    render() {
        return (
         <div className="about-container"> 
           <AboutUs></AboutUs>
           <WhatIs></WhatIs>
        </div>
        )
      }
    };
    
    export default Main;