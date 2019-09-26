import React, { Component } from 'react'
import { connect } from 'react-redux';

import LoginContainer from "../containers/LoginContainer";
import Input from '../containers/Input';
import { resetPassword, hashChecking } from '../actions/apiCalls';


class Reset extends Component {
  constructor(props) {
		super(props);
		this.state = {
      email: this.props.location.search.split('&')[0].split('=')[1],
      hash: this.props.location.search.split('&')[1].split('=')[1],
      hashOk: false,
			form: {
				password: '',
        password2: '',
        incorrect: false,
			}
    }
  }

  componentDidMount() {
    this.props.hashChecking({
      hash: this.state.hash,
      email: this.state.email
    }).then((data) => {
      if(data) {
        this.setState({
          hashOk: true
        })
      }
    })
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
  
  changePassword = (e) => {
    e.preventDefault();
    if(this.state.form.password !== this.state.form.password2) {
      this.setState({
        incorrect: true
      })
    } else {
      this.props.resetPassword({
        password: this.state.form.password,
        email: this.state.email
      });
    }
  }
  
  render() {
    return (
      <LoginContainer hideBtn={true}>
        {this.state.hashOk ? <form onSubmit={this.changePassword}>
					<h2>Resetuj hasło</h2>
					<Input type="password" placeholder="Hasło" label="Hasło" name="password" value={this.state.form.password} onChange={this.changeFormData}/>
					<Input type="password" placeholder="Hasło" label="Powtórz hasło" name="password2" value={this.state.form.password2} onChange={this.changeFormData}/>
          {this.state.incorrect ? <p>Hasła się niezgadzaja</p> : null}
					<button type="submit">Zapisz</button>
				</form> : <p>Niepoprawny url</p>}
      </LoginContainer>
    )
  }
}

export default connect(null, {resetPassword, hashChecking})(Reset);