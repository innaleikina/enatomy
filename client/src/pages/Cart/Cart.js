import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
import PopUp from "../../components/PopUp";

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
      total:0,
      purchaseClicked:false,
      emptyCartClicked:false
     }


     componentWillMount() {
       this.getUser();
       this.getFiles();
      //  this.getTotal();
      //  this.getImagesInCart();

     }

   getUser = () => {
    // console.log("got user");

    API.fetchUser() 
      .then(res => this.setState({
        user:res.data,
        cart:res.data.cart
      }))
      .catch(err => console.log(err))
  };

  getFiles = () => {
    // console.log("got files");
    API.getFiles() 
      .then(res => this.setState({
        allS3Files:res.data
      }))
      .then(res => this.getImagesInCart())
      .then(res => this.getTotal())
      .catch(err => console.log(err))
  };

  onRemoveClick = (e) => {
    // console.log("remove item clicked")
 
    e.preventDefault();
    API.removeOneFromCart(this.state.user._id, e.target.getAttribute('data-id'))
   .then(this.getUser(), this.getFiles()
   //window.location.reload()
   )
    .catch(err => console.log(err))
   
  }

  onEmptyClick = (e) => {
    e.preventDefault();

   this.setState({
      emptyCartClicked:true
    })

  }

  onCartEmptyConfirm = (e) => {
    e.preventDefault();

     this.setState({  
       cart:[]
      })
     API.emptyCart(this.state.user._id)
    .then(this.getUser(), this.getFiles())
    .catch(err => console.log(err))
    this.setState({
      emptyCartClicked:false
    })
  }

  emptyCart = () => {
    this.setState({  
      cart:[]
     })
    API.emptyCart(this.state.user._id)
   .then(this.getUser(), this.getFiles())
   .catch(err => console.log(err))
   this.setState({
     emptyCartClicked:false
   })
  }

  closePopUp = () => {
    this.setState({
       purchaseClicked:false,
       emptyCartClicked:false
      })
 }

  onPurchaseClick = () => {
    console.log("purchase clicked")
    this.setState({
       purchaseClicked:true
    })
    if(this.state.imagesInCart.length === 0){
      alert("no items in your cart")
    }
  }


  getTotal = () => {
    let total = (this.state.imagesInCart.length * this.state.price);
    this.setState({
      total:total
    })
 }

 getImagesInCart = () => {
   console.log("get images in cart");
  let s3FilesArr = []
  let cart = this.state.cart;
   for (var i = 0; i < this.state.allS3Files.length; i++){
      s3FilesArr.push(this.state.allS3Files[i].filename);
  }
    this.setState({
    imagesInCart:s3FilesArr.filter(value => -1 !== cart.indexOf(value))
  }) 
  // console.log(this.state.imagesInCart)
 }

 downloadAllSets = () => {
    console.log("dowload all sets");

    for(var i=0; i < this.state.imagesInCart.length;i++){
      console.log(this.state.imagesInCart[i])
      API.downloadSet(this.state.imagesInCart[i].slice(0, -3))
      // .then(res=> console.log(res.data))
      .then(res => window.open(res.data), this.emptyCart())
      .catch(err => console.log(err))
    }

 }


render() {
  // console.log(this.state.cart);

          return (
                <div className="cart-container">
                  <div className="title-empty-container">
                    <span id="title-cart">items in your cart ({this.state.imagesInCart.length})</span>
                    {(this.state.imagesInCart.length > 0) ?  <button className="empty-cart-btn" onClick = {this.onEmptyClick}>empty your cart</button>: <div></div>}
                  </div>
                  {/* <h2> first in cart is {this.state.cart[0]}</h2> */}
                  <div className="cart-items-container">
                  {(this.state.imagesInCart.length > 0) ? 
                  // <div> The is stuff in your cart!!!! </div>
                  this.state.imagesInCart.map((image,index) => (
                    <div className="image-info-container" key={index}>
                    <Link key={index} to={`/set/${image}`}>
                         <CoverPhoto key={index} fileName={image}>
                         </CoverPhoto>
                    </Link> 
                    <div className="name-price-container">
                      <span className="cart-model-name"> {image.slice(0, -4)} </span>
                      <span className="cart-separator"> / </span>
                      <span className="cart-price"> ${this.state.price}</span>
                    </div>
                    <button onClick={this.onRemoveClick} className="remove-btn" data-id={image}> remove</button>
                  
                  </div>
                  ))
                  : <div className="empty-cart-message">Your cart is empty</div>}
                    {/* {this.renderItemsInCart()} */}

                  </div>
                     
                  
                   <div className="total-purchase-container">
                      <h4 className="total-all"><span className="total-span">total is : </span>{this.state.total}$</h4>

                      <button onClick={this.onPurchaseClick} className="purchase-btn"> purchase </button>
                   </div>

                   {this.state.purchaseClicked && this.state.imagesInCart.length > 0? <PopUp buttonClicked="purchase" fetchUser={this.props.fetchUser} closePopUp={this.closePopUp} paymentForm={<StripeProvider apiKey="pk_test_Dnlcd3u8fxuOGycdNZ68LyJ200n3Qm5pGW">
                      <div className="example">
                        <Elements>
                          <CheckoutForm  downloadAllSets={this.downloadAllSets}  userId={this.state.user._id} cartItems={this.state.cart} amount={this.state.total} />
                        </Elements>
                       </div>
                   </StripeProvider>}>
                   
                   </PopUp>: <div></div>}

                   {this.state.emptyCartClicked ? <PopUp buttonClicked="emptyCart" fetchUser={this.props.fetchUser} closePopUp={this.closePopUp} emptyCart={
                     <div className="empty-cart-pop-up-wrap">
                       <span className="empty-cart"> Do you want to empty your cart?</span>
                       <div className="empty-cart-button-wrap">
                         <button className="empty-cart-pop-up-button" onClick={this.onCartEmptyConfirm}> yes </button>
                         <button className="empty-cart-pop-up-button" onClick={this.closePopUp}> no </button>
                       </div>
                     </div>
                   }>
                   
                   </PopUp>: <div></div>}
                   
                </div>
            )
          }
        };
        export default Cart