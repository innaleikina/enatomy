import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "../../components/Checkout";


import "./cart.css";



class Cart extends Component {
    state = {
      user:"",
      cart:[],
      allS3Files:[],
      imagesInCart:[],
      price:10,
      total:"",
     }


     componentWillMount() {
       this.getUser();
       this.getFiles();
      //  this.getTotal();
      //  this.getImagesInCart();

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
      .then(res => this.getImagesInCart())
      .then(res => this.getTotal())
      .catch(err => console.log(err))
  };

  onRemoveClick = (e) => {
    // console.log(e.target.getAttribute('data-id'));
    API.removeOneFromCart(this.state.user._id, e.target.getAttribute('data-id'))
   .then( this.getUser(), this.getFiles())
    .catch(err => console.log(err))
    // .then(this.getUser())
    .then(this.getImagesInCart())
    .catch(err => console.log(err));
  }

  onEmptyClick = () => {
    API.emptyCart(this.state.user._id)
    .then(this.getUser(), this.getImagesInCart())
    .catch(err => console.log(err))

  }


  getTotal = () => {
    let total = (this.state.imagesInCart.length * this.state.price);
    this.setState({
      total:total
    })
 }

 getImagesInCart = () => {
   console.log("got images in cart!")
  let s3FilesArr = []
  let cart = this.state.cart;
   for (var i = 0; i < this.state.allS3Files.length; i++){
      s3FilesArr.push(this.state.allS3Files[i].filename);
  }
    this.setState({
    imagesInCart:s3FilesArr.filter(value => -1 !== cart.indexOf(value))
  }) 
  console.log(this.state.imagesInCart)
 }


render() {
  // console.log(this.state.cart);

          return (
                <div >
                  <h1> this is  the cart page </h1>
                  <button onClick = {this.onEmptyClick}>empty your cart</button>
                  {/* <h2> first in cart is {this.state.cart[0]}</h2> */}
                  <div className="cartBorder">
                  {(this.state.imagesInCart.length > 0) ? 
                  // <div> The is stuff in your cart!!!! </div>
                  this.state.imagesInCart.map((image,index) => (
                    <div className="imageBtnWrap" key={index}>
                    <Link key={index} to={`/set/${image}`}>
                         <CoverPhoto key={index} fileName={image}>
                         </CoverPhoto>
                    </Link> 
                    <p> {this.state.price}$</p>
                    <button onClick={this.onRemoveClick} className="removeBtn" data-id={image}> remove</button>
                  
                  </div>
                  ))
                  : <div>Your cart is empty</div>}
                    {/* {this.renderItemsInCart()} */}

                  </div>
                     <h4>total is : {this.state.total}$</h4>

                  <StripeProvider apiKey="pk_test_Dnlcd3u8fxuOGycdNZ68LyJ200n3Qm5pGW">
                      <div className="example">
                        <h1>React Stripe Elements Example</h1>
                        <Elements>
                          <CheckoutForm emptyCart={this.onEmptyClick} userId={this.state.user._id} cartItems={this.state.cart} amount={this.state.total} />
                        </Elements>
                       </div>
                   </StripeProvider>
                   
                </div>
            )
          }
        };
        export default Cart