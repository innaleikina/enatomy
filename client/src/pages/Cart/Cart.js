import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
// import BuyButton from '../../components/BuyButton';
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


  renderItemsInCart = () => {
   let imagesToRender = [];

   for(var b =0; b < this.state.imagesInCart.length; b++){
    imagesToRender.push(<div className="imageBtnWrap" key={this.state.imagesInCart[b]}>
                          <Link key={this.state.imagesInCart[b]} to={`/set/${this.state.imagesInCart[b]}`}>
                               <CoverPhoto key={this.state.imagesInCart[b]} fileName={this.state.imagesInCart[b]}>
                               </CoverPhoto>
                          </Link> 
                          <p> {this.state.price}$</p>
                          <button onClick={this.onRemoveClick} className="removeBtn" data-id={this.state.imagesInCart[b]}> remove</button>
                        
                        </div>)
    }
   return imagesToRender
  }


  onRemoveClick = (e) => {
    // console.log(e.target.getAttribute('data-id'));
    API.removeOneFromCart(this.state.user._id, e.target.getAttribute('data-id'))
    .catch(err => console.log(err))
  }

  onEmptyClick = () => {
    API.emptyCart(this.state.user._id)
    .catch(err => console.log(err))
  }


  getTotal = () => {
    let total = (this.state.imagesInCart.length * this.state.price);
    this.setState({
      total:total
    })
 }

 getImagesInCart = () => {
  let s3FilesArr = []
  let cart = this.state.cart;
   for (var i = 0; i < this.state.allS3Files.length; i++){
      s3FilesArr.push(this.state.allS3Files[i].filename);
  }
  
  this.setState({
    imagesInCart:s3FilesArr.filter(value => -1 !== cart.indexOf(value))
  }) 
 }


render() {
  console.log(this.state.imagesInCart)
          return (
                <div >
                  <h1> this is  the cart page </h1>
                  <button onClick = {this.onEmptyClick}>empty your cart</button>
                  {/* <h2> first in cart is {this.state.cart[0]}</h2> */}
                  <div className="cartBorder">
                    {this.renderItemsInCart()}
                  </div>
                     <h4>total is : {this.state.total}$</h4>

                  <StripeProvider apiKey="pk_test_Dnlcd3u8fxuOGycdNZ68LyJ200n3Qm5pGW">
                      <div className="example">
                        <h1>React Stripe Elements Example</h1>
                        <Elements>
                          <CheckoutForm amount={this.state.total} />
                        </Elements>
                       </div>
                   </StripeProvider>
                   
                </div>
            )
          }
        };
        export default Cart