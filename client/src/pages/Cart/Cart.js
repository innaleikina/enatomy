import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
import "./cart.css";



class Cart extends Component {
    state = {
      user:"",
      cart:[],
      allS3Files:[]
     }


     componentWillMount() {
       this.getUser();
       this.getFiles();
     }

   getUser = () => {
    API.fetchUser() 
      .then(res => this.setState({
        user:res.data,
        cart:res.data.cart
      }))
      .catch(err => console.log(err))
  };

  getFiles = () => {
    API.getFiles() 
      .then(res => this.setState({
        allS3Files:res.data
      }))
      .catch(err => console.log(err))
  };


  renderItemsInCart = () => {
  console.log(this.state.allS3Files)
  // console.log("cart is " + this.state.cart)
  let cart = this.state.cart;

  let s3FilesArr = []
  for (var i = 0; i < this.state.allS3Files.length; i++){
      s3FilesArr.push(this.state.allS3Files[i].filename);
  }
  console.log("s3 files outside the object " + s3FilesArr);

   let imagesToRender = [];
   let imagesInCart = s3FilesArr.filter(value => -1 !== cart.indexOf(value));
   console.log("images in cart " + imagesInCart);
  //  for(var i =0; i < imagesInCart.length; i++){
  //   imagesToRender.push(<Link>key={imagesInCart[i]} to={`/set/${imagesInCart[i]}`}><CoverPhoto key={imagesInCart[i]} fileName={imagesInCart[i]}>
  //   </CoverPhoto></Link>)
  //  }
  //  return imagesToRender
  }


     

     render() {
        //store will render a grid of store items 
       
        
            return (
                <div >
                  <h1> this is  the cart page </h1>
                  <h2> id is {this.state.user._id}</h2>
                  {/* <h2> first in cart is {this.state.cart[0]}</h2> */}
                  <div className="cartBorder">
                    {this.renderItemsInCart()}
                  </div>
                   
                </div>
            )
          }
        };
        export default Cart