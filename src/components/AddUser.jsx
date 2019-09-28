import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Input from '../containers/Input';
import Box from '../containers/Box';
import { addUser } from '../actions/apiCalls';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      login: '',
      password: '',
      email: '',
      typ: '',
      tel: ''
    };
    this.options = [
      {id: 'service', name: 'Serwisant'},
      {id: 'coordinate', name: 'Kordynator'},
      {id: 'adder', name: 'Rejestrator'}
    ]
  }

  componentDidMount() {
    if(this.props.cookies.get('login').profile !== 'admin') {
      this.props.history.push(`/panel/${this.props.cookies.get('login').id}/home`);
    }
  }

  changeFormData = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  addUser = (e) => {
    e.preventDefault();
    this.props.addUser(this.state).then(() => {
      this.props.history.push(`/panel/${this.props.cookies.get('login').id}/users`);
    })
  }

  render() {
    return (
      <Box title="Dodaj pracownika">
        <form onSubmit={this.addUser}>
          <Input type="text" placeholder="Imię" label="Imię" name="firstname" value={this.state.firstname} onChange={this.changeFormData} required/>
          <Input type="text" placeholder="Nazwisko" label="Nazwisko" name="lastname" value={this.state.lastname} onChange={this.changeFormData} required/>
          <Input type="text" placeholder="Login" label="Login" name="login" value={this.state.login} onChange={this.changeFormData} required/>
          <Input type="password" placeholder="Hasło" label="Hasło" name="password" value={this.state.password} onChange={this.changeFormData} required/>
          <Input type="text" placeholder="Telefon" label="Telefon" name="tel" value={this.state.tel} onChange={this.changeFormData} required/>
          <Input type="email" placeholder="E-mail" label="E-mail" name="email" value={this.state.email} onChange={this.changeFormData} required/>
          <Input type="select" options={this.options} placeholder="Typ" label="Typ" name="typ" value={this.state.typ} onChange={this.changeFormData} required/>
          <div className="form-buttons-container">
            <button type="submit">Dodaj</button>
          </div>
        </form>
      </Box>
    )
  }
}

export default connect(null , {addUser})(withCookies(AddUser));