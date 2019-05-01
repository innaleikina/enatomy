import React, { Component } from 'react';
import './oneset.css';
import CoverPhoto from '../../components/CoverPhoto'
import API from "../../utils/API";

class OneSet extends Component {

  state = {
   price:10 + "$",
   user:"",
   cart:""

  }

  componentWillMount() {
    this.getUser()
 }


  getUser = () => {
    API.fetchUser() 
      .then(res => this.setState({
        user:res.data,
        cart:res.data.cart
      }))
      .catch(err => console.log(err))
  };
  



addToCart = () => {
 
  // console.log(this.state.user._id);
  // console.log(this.props.match.params.id);
  console.log(this.state.cart)
  console.log(this.state.cart.length)

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
           <button onClick={this.addToCart} className="cart-btn"> add to cart </button>
        </div>
        )
      }
    };
    
    export default OneSet;