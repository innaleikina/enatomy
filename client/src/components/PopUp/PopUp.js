import React, { Component } from 'react';
// import { BrowserRouter as  Redirect } from "react-router-dom";
import "./popup.css"

class PopUp extends Component {
  state = {

  }




  render() {
    return (
        <div id="popUp" className="popUp">
          <button onClick={this.props.closePopUp}> X </button>
        </div>
    )
  }
};

export default PopUp;