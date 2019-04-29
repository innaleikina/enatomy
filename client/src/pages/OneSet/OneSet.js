import React, { Component } from 'react';
import './oneset.css';
import CoverPhoto from '../../components/CoverPhoto'
import API from "../../utils/API";

class OneSet extends Component {

  state = {
   price:10 + "$",
   user:""

  }

  componentWillMount() {
    this.getUser()
 }


  getUser = () => {
    API.fetchUser() 
      .then(res => this.setState({
        user:res.data
      }))
      .catch(err => console.log(err))
  };




  addToCart = () => {
    // console.log(this.state.user._id);
    // console.log(this.props.match.params.id);
    console.log(this.state.user.cart)
    API.addToCart(this.state.user._id,this.props.match.params.id) 
    .catch(err => console.log(err))
  }

    render() {
        console.log(this.props)
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