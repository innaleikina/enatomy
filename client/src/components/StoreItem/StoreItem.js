import React, { Component } from 'react';
// import API from "../../utils/API";




class StoreItem extends Component {
    state = {
        image:"",
        price:"",
        title:"",
        addToCart:"",
        filesInSet:""
       }

componentDidMount() {
      this.getProduct()
     }
 
 


getProduct =() => {
}
    
  render() {
    //   this.getProduct();
    return (
        <div >
         <p> This is a store item</p>
         {/* the cover photo is public and is displayed. Not dynamic yet */}
         <img src="https://s3.amazonaws.com/enatomy/_MG_0131_web_e.jpg"/>
        </div>
       
    )
  }
};
export default StoreItem;