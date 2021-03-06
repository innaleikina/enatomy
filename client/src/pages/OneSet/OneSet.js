import React, { Component } from 'react';
import './oneset.css';
import CoverPhoto from '../../components/CoverPhoto'
import API from "../../utils/API";
// import LogInSignUp from "../../components/LogInSignUp"

class OneSet extends Component {

  state = {
   price:10 + "$",
   user:"",
   cart:[],
   purchased:[]

  }

  componentWillMount() {
    this.getUser()
 }


  getUser = () => {
    API.fetchUser() 
      .then(res => this.setState({
        user:res.data,
        cart:res.data.cart,
        purchased:res.data.purchased,
        cartLength:0
      }))
      .catch(err => console.log(err))
  };

  downloadSet = () => {
    // console.log("download set clicked");
    API.downloadSet(this.props.match.params.id.slice(0, -3))
    // .then(res=> console.log(res.data))
    .then(res => window.location.href = res.data)
    .catch(err => console.log(err))
  }
  
checkIfPurchased = () => {

  if(this.state.user === ""){
    return <p className="oneSet-message">  you must be signed in to purchase </p>
  } else {
      if(this.state.purchased.includes(this.props.match.params.id)){
          return <button onClick={this.downloadSet} className="cart-btn"> download this set</button>
       } else if(this.state.cart.includes(this.props.match.params.id)){
        return <span className="item-in-cart-message"> item is in your cart </span>


       }
       else {
          return <button onClick={this.addToCart} className="cart-btn"> add to cart </button>

       }
  }
}



addToCart = () => {
   if (this.state.cart.length === 0) {
    API.addToCart(this.state.user._id, this.props.match.params.id)
      .catch(err => console.log(err))
    this.getUser()
  } else {
   //console.log("cart is longer than zero!");
    if (this.state.cart.includes(this.props.match.params.id)) {
      alert("item already in cart")
    } else {
      API.addToCart(this.state.user._id, this.props.match.params.id)
        .catch(err => console.log(err))
      // console.log("item is not in the cart");
    }
  }
  API.getUserCart(this.state.user._id)
  .then(res => this.setState({
    cart: res.data.cart
  }));
}
    
    
   

    render() {
      //  console.log("right before render " + this.state.user.cart)
        let jpgName = this.props.match.params.id;
        let modelName = jpgName.substring(0, jpgName.length - 4);
        let gifName = modelName + ".gif"
        
        return (
         <div className="oneSet-wrap"> 
          <div className="name-price"> <span id="model-name">{modelName}</span> / <span id="oneSet-price"> {this.state.price}</span> </div>
           <CoverPhoto fileName={gifName}> </CoverPhoto>
      
           {/* <button onClick={this.addToCart} className="cart-btn"> add to cart </button> */}
           {this.checkIfPurchased()}
        </div>
        )
      }
    };
    
    export default OneSet;