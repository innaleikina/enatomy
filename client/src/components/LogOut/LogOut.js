import React from 'react';
import { Button} from "../../components/Form"
import "./logout.css";

const LogOut = (props) => (
   
  <Button type="button" id="logoutBtn" onClick={props.handleLogout}>Logout</Button>
)

export default LogOut;