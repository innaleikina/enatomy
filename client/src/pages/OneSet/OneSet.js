import React, { Component } from 'react';
import './oneset.css';
import CoverPhoto from '../../components/CoverPhoto'

class OneSet extends Component {

  state = {
   price:10 + "$",
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
           <button className="cart-btn"> add to cart </button>
        </div>
        )
      }
    };
    
    export default OneSet;