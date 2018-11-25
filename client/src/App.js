import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import API from "./utils/API";




class App extends Component {

  state = {
    user: {},
    authed: false
  }

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.setState({
            user: res.data,
            authed: true
          }, this.logoutButton)
        }
      })
  };

  componentDidMount() {
    this.fetchUser();
  };

  render() {
    return (
      <Router>
      <div className="App">
         <h1> Enatomy </h1>

         <Switch>
            <Route exact path="/"  render={(props) => <SignUp {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/signin"  render={(props) => <SignIn {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/home"  render={(props) => <Home {...props} fetchUser={this.fetchUser}/>}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
