import React from "react";
import { Link } from 'react-router-dom';
import "./nav.css";

export const NavBar = ({ children }) => {
  return (
    <nav >
      <h2 ><Link id="site-name" to="/"> E-natomy </Link></h2>
      <ul className="nav">
        {children}
      </ul>
    </nav>
  );
};