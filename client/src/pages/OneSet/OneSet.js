import React, { Component } from 'react';
import './oneset.css';
import CoverPhoto from '../../components/CoverPhoto'
import API from "../../utils/API";

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
        purchased:res.data.purchased
      }))
      .catch(err => console.log(err))
  };

  downloadSet = () => {
    console.log("download set clicked");
    API.downloadSet(this.props.match.params.id)
    .catch(err => console.log(err))
  }
  
checkIfPurchased = () => {
    if(this.state.purchased.includes(this.props.match.params.id)){
      return <button onClick={this.downloadSet} className="cart-btn"> download this set</button>

    } else {
     return <button onClick={this.addToCart} className="cart-btn"> add to cart </button>

    }
  }



addToCart = () => {
   if (this.state.cart.length === 0) {
    API.addToCart(this.state.user._id, this.props.match.params.id)
      .catch(err => console.log(err))
    console.log("the cart length is zero!")
  } else {
   //console.log("cart is longer than zero!");
    if (this.state.cart.includes(this.props.match.params.id)) {
      alert("item already in cart")
    } else {
      API.addToCart(this.state.user._id, this.props.match.params.id)
        .catch(err => console.log(err))
      console.log("item is not in the cart");
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
        
        return (
         <div > 
           <h1> Individual photo set page </h1>
           <h2>{modelName}</h2>
           <CoverPhoto fileName={this.props.match.params.id}> </CoverPhoto>
            <h4>{this.state.price}</h4>
           {/* <button onClick={this.addToCart} className="cart-btn"> add to cart </button> */}
           {this.checkIfPurchased()}
        </div>
        )
      }
    };
    
    export default OneSet;