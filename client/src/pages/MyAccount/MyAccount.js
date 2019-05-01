import React, { Component } from 'react';
import API from "../../utils/API";


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
         
        </div>
    );
  }
}
export default MyAccount