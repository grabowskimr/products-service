import React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../static/images/logo.png";

const Topbar = (props) => (
  <div className="topbar">
    <div className="hamburger" onClick={props.toggleSidebar}>&#9776;</div>
    <Link to={props.homeLink}>
      <img src={Logo} alt="logo" className="logo"/>
    </Link>
    <div className="toolbar-contant">
      {props.children}
    </div>
  </div>
);

export default Topbar;