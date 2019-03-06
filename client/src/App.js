import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Main from "./pages/Main";
import Store from "./pages/Store";
import MyAccount from "./pages/MyAccount";
import API from "./utils/API";
import {NavBar, NavItem} from "./components/Nav";
import "./normalize.css";
import LogOut from "./components/LogOut";
import "./components/Nav/nav.css";



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

  logoutButton = (history) => {
    let logoutbtn = document.getElementById("logoutBtn");
    if (this.state.authed === true) {
      logoutbtn.style.display = "block";
    } else {
      logoutbtn.style.display = "none";
    }
  };

  handleLogout = () => {
    API.logout() 
      .then(res => this.setState({
        user: {},
        authed: false
      }, this.logoutButton))
      .catch(err => console.log(err));
  };

  render() {
    console.log("authed is " + this.state.authed);
    return (
      <Router>
      <div className="App">
         <NavBar>
            <ul className="nav-items">
                <NavItem link="/store"> store </NavItem>
                <NavItem link="/pricing"> pricing </NavItem>
                {/* <NavItem link="/sketch"> sketch </NavItem> */}
                <NavItem link="/cart"> cart </NavItem>
                <NavItem link="/myaccount"> my account </NavItem>

                <LogOut handleLogout={this.handleLogout}></LogOut>
            </ul>
         </NavBar>

         <Switch>
            <Route exact path="/"  render={(props) => <Main {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/myaccount"  render={(props) => <MyAccount {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/store"  render={(props) => <Store {...props} fetchUser={this.fetchUser}/>}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
