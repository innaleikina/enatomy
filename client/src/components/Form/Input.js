import React from "react";

export const Input = props => (
  <div className="input-container">
     <label> {props.label} </label>
    <input id={props.id} className="input" {...props} placeholder={props.placeholder}  />
  </div>
);
