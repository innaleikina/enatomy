import React, { Component } from 'react';
import "./footer.css";

class Footer extends Component {


    render() {
        return (
            <div className="footer-container">
               <span> copyright @2019</span>
               <div className="icons-container">
                   <img className="icon" alt="instagram icon" src="./images/instagram-gray.png"/>
                   <img className="icon" alt="facebook icon" src="./images/facebook-gray.png"/>
                   <img className="icon" alt="twitter icon" src="./images/twitter-gray.png"/>

               </div>
            </div>
        )
    }

};


export default Footer;