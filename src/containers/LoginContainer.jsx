import React from "react";
import Logo from "../static/images/logo.png";

const LoginContainer = props => (
  <div className="login-container">
    <div className="page-logo">
      <a href="/"><img src={Logo} alt="logo" /></a>
    </div>
    <div className="login-box">{props.children}</div>
    {!props.hideBtn ? <div className="toggleBtn">
      <button onClick={props.onShowRegister}>{!props.showRegister ? 'Zarejestruj sie' : 'Zaloguj się'}</button>
      <button onClick={props.toggleResetPassword}>{props.togglePasswordReset ? 'Ukryj resetowanie hasła' : 'Zapomniałem hasła'}</button>
    </div> : null}
  </div>
);

export default LoginContainer;
