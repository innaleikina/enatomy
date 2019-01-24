import React from "react";
import './nav.css';
import { NavLink } from 'react-router-dom';


export const Nav = props => (
  <nav>
    <h2><NavLink id="name" to="/">  E-natomy </NavLink></h2>
    <ul className="nav-items">
        <NavLink to="/search" className="nav-item"> search </NavLink>
        <NavLink to="/pricing" className="nav-item"> pricing </NavLink>
        <NavLink to="/sketch" className="nav-item"> sketch </NavLink>
        {/* <NavLink to="/contact" className="nav-item"> contact </NavLink> */}
        <NavLink to="/cart" className="nav-item"> cart </NavLink>
        <button>log out</button>

    </ul>
  </nav>
);