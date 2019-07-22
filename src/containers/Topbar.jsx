import React from 'react';

import Logo from "../static/images/logo.png";

const Topbar = (props) => (
  <div className="topbar">
    <div className="hamburger">&#9776;</div>
    <img src={Logo} alt="logo" className="logo"/>
    <div className="toolbar-contant">
      {props.children}
    </div>
  </div>
);

export default Topbar;