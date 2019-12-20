import React, { Component } from 'react';
import API from "../../utils/API";
import "./passreset.css"



class PassResetPage extends Component {


state = {
    user:"",

  }

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.setState({
            user: res.data,
          })
      }
    })
  };

  componentDidMount() {

    this.fetchUser();

  };


  render() {
    // console.log(this.props.location)
    return (
     <form id="pass-reset-form">
       <p> Password Reset Page </p>
       <label> email </label>
       <input className="pass-reset-input"></input>
       
       <label> password</label>
       <input className="pass-reset-input"></input>

       <label> repeat password</label>
       <input className="pass-reset-input"></input>
       <button> change password </button>
     </form>




    );
  }

}

export default PassResetPage;
