import React from "react";
import { NavLink } from 'react-router-dom';
import "./nav.css";

export const NavItem = props => (
  <li className="nav-item">
     <NavLink activeStyle={{ color: '#EB5E28' }} className="nav-item" id={props.id} to={props.link} onClick={props.onClick}>{props.children}</NavLink>
  </li>
);
