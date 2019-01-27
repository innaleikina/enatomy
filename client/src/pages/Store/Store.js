import React, { Component } from 'react';
// import API from "../../utils/API";
import StoreItem from '../../components/StoreItem';




class Store extends Component {
//     state = {
//         image:"",
//         price:"",
//         title:"",
//         addToCart:""
//        }
 
// client = new Client({
//     store: 200629,
// });

// getProduct =() => {
//     this.client
//     .getProduct('https://selz.co/NJngtbLQU')
//     .then(product => {
//         console.log('Product', product);
//     })
//     .catch(errors => console.error('Error getting product', errors));

// }
    
  render() {

    return (
        <div >
           <StoreItem itemId="NJngtbLQU"></StoreItem>
        </div>
    )
  }
};
export default Store