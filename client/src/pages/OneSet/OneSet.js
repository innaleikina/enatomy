import React, { Component } from 'react';
import './oneset.css';


class OneSet extends Component {

   

    render() {
        console.log(this.props)
        let jpgName = this.props.match.params.id;
        let modelName = jpgName.substring(0, jpgName.length - 4);

        return (
         <div > 
           <h1> Individual photo set page </h1>
           <h2>{modelName}</h2>

           <button className="purchase-btn"> purchase </button>
        </div>
        )
      }
    };
    
    export default OneSet;