import React from "react";
import Logo from "../static/images/logo.png";

const LoginContainer = props => (
  <div className="login-container">
    <div className="page-logo">
      <img src={Logo} alt="logo" />
    </div>
    <div className="login-box">{props.children}</div>
  </div>
);

export default LoginContainer;
