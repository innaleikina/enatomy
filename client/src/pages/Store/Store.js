import React, { Component } from 'react';
// import API from "../../utils/API";
import StoreItem from '../../components/StoreItem';




class Store extends Component {
    
  render() {
//store will render a grid of store items 
    return (
        <div >
          <h1> this is a store </h1>
           <StoreItem></StoreItem>

           
        </div>
    )
  }
};
export default Store