import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Main from "./pages/Main";

// import SignIn from "./pages/SignIn";
import MyAccount from "./pages/MyAccount";
import API from "./utils/API";
import {Nav} from "./components/Nav";
import "./normalize.css";



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
         <Nav></Nav>

         <Switch>
            <Route exact path="/"  render={(props) => <Main {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/myaccount"  render={(props) => <MyAccount {...props} fetchUser={this.fetchUser}/>}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
