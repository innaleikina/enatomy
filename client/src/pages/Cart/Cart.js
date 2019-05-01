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
      imagesInCart:[],
      price:10,
      total:"",
     }


     componentWillMount() {
       this.getUser();
       this.getFiles();
       this.getTotal();

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
    let cart = this.state.cart;

    let s3FilesArr = []
    for (var i = 0; i < this.state.allS3Files.length; i++){
        s3FilesArr.push(this.state.allS3Files[i].filename);
    }

   let imagesToRender = [];
   let imagesInCart = s3FilesArr.filter(value => -1 !== cart.indexOf(value));
   console.log("initial length" + imagesInCart.length)
  //  console.log("images in cart " + imagesInCart[0]);
   for(var b =0; b < imagesInCart.length; b++){
    imagesToRender.push(<div className="imageBtnWrap" key={imagesInCart[b]}>
                          <Link key={imagesInCart[b]} to={`/set/${imagesInCart[b]}`}>
                               <CoverPhoto key={imagesInCart[b]} fileName={imagesInCart[b]}>
                               </CoverPhoto>
                          </Link> 
                          <p> {this.state.price}$</p>
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

  onEmptyClick = () => {
    API.emptyCart(this.state.user._id)
    .catch(err => console.log(err))
  }

  getItemsInCart = () => {

  }

  getTotal = () => {
    let s3FilesArr = []
    let cart = this.state.cart;

    for (var i = 0; i < this.state.allS3Files.length; i++){
        s3FilesArr.push(this.state.allS3Files[i].filename);
    }
    console.log(this.state.alls3Files);
    let imagesInCart = s3FilesArr.filter(value => -1 !== cart.indexOf(value));
     console.log(imagesInCart);

    let total = (imagesInCart.length * this.state.price);
    console.log(total);

    let renderTotal = (<div> <p> total {total}$</p></div>)

   return renderTotal;
  }




     

     render() {

        //store will render a grid of store items 
       
        
            return (
                <div >
                  <h1> this is  the cart page </h1>
                  <button onClick = {this.onEmptyClick}>empty your cart</button>
                  {/* <h2> first in cart is {this.state.cart[0]}</h2> */}
                  <div className="cartBorder">
                    {this.renderItemsInCart()}
                  </div>
                     {this.getTotal()}
                  
                  <button>buy</button>
                   
                </div>
            )
          }
        };
        export default Cart