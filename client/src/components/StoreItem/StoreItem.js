import React, { Component } from 'react';
// import API from "../../utils/API";
import Client from 'selz-js-sdk';




class StoreItem extends Component {
    state = {
        image:"",
        price:"",
        title:"",
        addToCart:""
       }
 
client = new Client({
    store: 200629,
});

getProduct =() => {
    this.client
    .getProduct('https://selz.co/'+ this.props.itemId)
    .then(product => {
        console.log('Product', product);
    })
    .catch(errors => console.error('Error getting product', errors));

}
    
  render() {
      this.getProduct();
    return (
        <div >
           {/* <Markup content={this.articleContent} /> */}
        </div>
    )
  }
};
export default StoreItem;