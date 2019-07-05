import React, { Component } from "react";

import LoginContainer from "../containers/LoginContainer";
import Input from '../containers/Input';

class Login extends Component {

	login = (e) => {
		e.preventDefault();
		this.props.history.push('/panel/home');
	}

  render() {
    return (
      <LoginContainer>
					<form onSubmit={this.login}>
						<Input type="text" placeholder="Login" label="Login" />
						<Input type="password" placeholder="Hasło" label="Hasło" />
						<Input type="submit" value="Zaloguj" />
					</form>
      </LoginContainer>
    );
  }
}

export default Login;
