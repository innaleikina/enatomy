import React, { Component } from 'react';
import "./storeitem.css";
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
         <img alt="model" className="image" src={`https://s3.amazonaws.com/enatomy/${this.props.fileName}`}/>
        
        </div>
       
    )
  }
};
export default StoreItem;