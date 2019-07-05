import React from 'react';

import Logo from "../static/images/logo.png";

const Topbar = (props) => (
  <div className="topbar">
    <img src={Logo} alt="logo" className="logo"/>
    <div className="toolbar-contant">
      {props.children}
    </div>
  </div>
);

export default Topbar;