import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./pages/Main";
import Store from "./pages/Store";
import MyAccount from "./pages/MyAccount";
import OneSet from "./pages/OneSet";
import API from "./utils/API";
import Cart from "./pages/Cart";
// import Pricing from "./pages/Pricing";
import {NavBar, NavItem} from "./components/Nav";
import "./normalize.css";
import LogOut from "./components/LogOut";
import "./components/Nav/nav.css";



class App extends Component {

  state = {
    user: {},
    authed: false,
    loggedOut:false,
  }

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.setState({
            user: res.data,
            authed: true,
            loggedOut:false
          }, this.logoutButton)
        }
      })
  };

  componentDidMount() {

    this.fetchUser();
    
  };

  logoutButton = () => {
    this.setState({
      loggedOut:false
    })
    let logoutbtn = document.getElementById("logoutBtn");
    let myAccount = document.getElementById("myAccount");
    let myCart = document.getElementById("myCart");

    if (this.state.authed === true) {
      logoutbtn.style.display = "block";
      myAccount.style.display = "block";
      myCart.style.display = "block";
    } else {
      logoutbtn.style.display = "none";
      myAccount.style.display = "none";
      myCart.style.display = "none";
    }
  };

  handleLogout = () => {
    API.logout() 
      .then(res => this.setState({
        user: {},
        authed: false,
        loggedOut:true
      }, this.logoutButton))
      .catch(err => console.log(err));
 
  };


  render() {
    console.log(this.state.loggedOut)
    

    return (
      <Router>
      <div className="App">
         <NavBar>
            <ul className="nav-items">
                <NavItem link="/store"> store </NavItem>
                {/* <NavItem link="/pricing"> pricing </NavItem> */}
                {/* <NavItem link="/sketch"> sketch </NavItem> */}
                <NavItem id="myCart" link="/cart"> cart </NavItem>
                <NavItem id="myAccount" link="/myaccount"> my account </NavItem>

                <LogOut handleLogout={this.handleLogout} ></LogOut>
            </ul>
         </NavBar>

          {this.state.loggedOut ?  <Redirect to='/'/> : <div></div> }

         <Switch>
            <Route exact path="/"  render={(props) => <Main {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/myaccount"  render={(props) => <MyAccount {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/store"  render={(props) => <Store {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/cart"  render={(props) => <Cart {...props} fetchUser={this.fetchUser}/>}/>
            <Route exact path="/set/:id"  render={(props) => <OneSet {...props} fetchUser={this.fetchUser}/>}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
