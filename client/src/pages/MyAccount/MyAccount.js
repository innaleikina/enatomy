import React, { Component } from 'react';
import API from "../../utils/API";
import "./MyAccount.css";


class MyAccount extends Component {
    state = {
       user:""
      }

    componentWillMount() {
        this.getUser()
     }
 

    getUser = () => {
        API.fetchUser() 
          .then(res => this.setState({
            user:res.data
          }))
          .catch(err => console.log(err))
      };
  


  render() {
    return (
        <div id="timeline-wrap" >
           <h1> Welcome to your account, {this.state.user.name} </h1>
           
           <h3> Purchased Sets </h3>
           {/* render sets that have been purchased before, if lcicked go to imgae page */}
           <div className="purchased-sets"></div>

           <h3>Settings </h3>
           {/* when button is clicked a pop up shows up to change password */}
           <button> change password </button>

            { /* pop up to confirm */}
           <button> change password </button>
        </div>
    );
  }
}
export default MyAccount