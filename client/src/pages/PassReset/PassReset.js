import React, { Component } from 'react';
// import API from "../../utils/API";


class PasswordResetPage extends Component {


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


  

}

export default PasswordResetPage;
