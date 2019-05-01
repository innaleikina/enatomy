import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
import "./cart.css";



class Cart extends Component {
    state = {
      user:"",
      cart:[],
      allS3Files:[],
      imagesInCart:[]
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

   let imagesToRender = [];
   let imagesInCart = s3FilesArr.filter(value => -1 !== cart.indexOf(value));
  //  console.log("images in cart " + imagesInCart[0]);
   for(var b =0; b < imagesInCart.length; b++){
     console.log(imagesInCart[b]);
    imagesToRender.push(<div className="imageBtnWrap" key={imagesInCart[b]}>
                          <Link key={imagesInCart[b]} to={`/set/${imagesInCart[b]}`}>
                               <CoverPhoto key={imagesInCart[b]} fileName={imagesInCart[b]}>
                               </CoverPhoto>
                          </Link> 
                          <button onClick={this.onRemoveClick} className="removeBtn" data-id={imagesInCart[b]}> remove</button>
                        </div>)
    }
   return imagesToRender
  }


  onRemoveClick = (e) => {
    console.log(e.target.getAttribute('data-id'));
    API.removeOneFromCart(this.state.user._id, e.target.getAttribute('data-id'))
    .catch(err => console.log(err))
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