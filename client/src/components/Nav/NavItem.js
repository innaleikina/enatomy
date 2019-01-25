import React from "react";
import { NavLink } from 'react-router-dom';
import "./nav.css";

export const NavItem = props => (
  <li className="nav-item">
     <NavLink className="nav-item" to={props.link} onClick={props.onClick}>{props.children}</NavLink>
  </li>
);
