import React, { Component } from "react";
import { connect } from 'react-redux';

import LoginContainer from "../containers/LoginContainer";
import Input from '../containers/Input';
import { clearLoginError } from '../actions/actions';
import { registerToApp, loginToApp } from '../actions/apiCalls';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showRegister: false,
			form: {
				login: '',
				password: '',
				email: '',
				firstname: '',
				lastname: '',
				company: '',
				address: '',
				tel: ''
			}
		}
	}

	login = (e) => {
		e.preventDefault();
		this.props.loginToApp(this.state.form).then((data) => {
			if(data.login) {
				this.props.history.push('/panel/home');
			}
		});
	}

	register = (e) => {
		e.preventDefault();
		this.props.registerToApp(this.state.form);
	}

 	changeFormData = (e) => {
		let name = e.target.name;
		this.setState({
			form: {
				...this.state.form,
				[name]: e.target.value
			}
		});
	}

	onShowRegister = () => {
		this.props.clearLoginError();
		this.setState({
			showRegister: !this.state.showRegister
		});
	}
	

  render() {
    return (
			<LoginContainer onShowRegister={this.onShowRegister} showRegister={this.state.showRegister}>
			{!this.state.showRegister ? 
				<form onSubmit={this.login}>
					<h2>Zaloguj się</h2>
					{this.props.loginError.length ? <span className="error">{this.props.loginError}</span> : null}
					<Input type="text" placeholder="Login" label="Login" name="login" value={this.state.form.login} onChange={this.changeFormData}/>
					<Input type="password" placeholder="Hasło" label="Hasło" name="password" value={this.state.form.password} onChange={this.changeFormData}/>
					<button type="submit">Zaloguj się</button>
				</form>
			:
				<form onSubmit={this.register}>
					<h2>Zarejestruj się</h2>
					{this.props.loginError.length ? <span className="error">{this.props.loginError}</span> : null}					
					<Input type="text" placeholder="Login" label="Login" name="login" value={this.state.form.login} onChange={this.changeFormData}/>
					<Input type="password" placeholder="Hasło" label="Hasło" name="password" value={this.state.form.password} onChange={this.changeFormData}/>
					<Input type="email" placeholder="E-mail" label="Email" name="email" value={this.state.form.email} onChange={this.changeFormData}/>
					<Input type="text" placeholder="Imię" label="Imię" name="firstname" value={this.state.form.firstname} onChange={this.changeFormData}/>
					<Input type="text" placeholder="Nazwisko" label="Nazwisko" name="lastname" value={this.state.form.lastname} onChange={this.changeFormData}/>
					<Input type="text" placeholder="Firma" label="Firma" name="company" value={this.state.form.company} onChange={this.changeFormData}/>
					<Input type="text" placeholder="Adres" label="Adres" name="address" value={this.state.form.address} onChange={this.changeFormData}/>
					<Input type="text" placeholder="Telefon" label="Telefon" name="tel" value={this.state.form.tel} onChange={this.changeFormData}/>
					<button type="submit">Zarejestruj się</button>
				</form>}
		</LoginContainer>
    );
  }
}

function mapStateToProps(state) {
	return {
		login: state.mainReducer.login,
		loginError: state.mainReducer.loginError
	}
}

export default connect(mapStateToProps, {registerToApp, loginToApp, clearLoginError})(Login);
