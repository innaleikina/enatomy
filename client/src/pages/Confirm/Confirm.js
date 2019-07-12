import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
// import CoverPhoto from '../../components/CoverPhoto';
// import PopUp from "../../components/PopUp";

// import {Elements, StripeProvider} from 'react-stripe-elements';
// import CheckoutForm from "../../components/Checkout";


import "./confirm.css";



class Confirm extends Component {
    state = {

     }


     componentWillMount() {
    //    this.getUser();
    //    this.getFiles();
    //   //  this.getTotal();
    //   //  this.getImagesInCart();

     }

   getUser = () => {
    API.fetchUser() 
      .then(res => this.setState({
        user:res.data,
        cart:res.data.cart
      }))
      .catch(err => console.log(err))
  };

  

render() {
  // console.log(this.state.cart);

          return (
                <div>
                    <h1> Confirm page </h1>
                </div>
            )
          }
        };
        export default Confirm;