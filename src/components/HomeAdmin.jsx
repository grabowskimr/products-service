import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Box from '../containers/Box.jsx';
import Search from '../containers/Search';
import { getUsers } from '../actions/apiCalls';

class HomeAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.props.getUsers().then((users) => {
      this.setState({
        users: users
      })
    })
  }

  search = (e) => {
    let users = this.state.users;
    let searchText = e.target.value.toUpperCase();
    users.map((user) => {
      var show = (user.login.toUpperCase().includes(searchText)) || (user.company.toUpperCase().includes(searchText)) || (user.lastname.toUpperCase().includes(searchText));
      if(show) {
        user.hide = false;
      } else {
        user.hide = true;
      }
      return user;
    })
    this.setState({
      users: users
    });
  }

  render() {
    return (
      <>
        <Search filterMethod={this.search} placeholder="Szukaj: login, nazwisko, firma" />
        <Box title="Klienci" list size={100}>
          <div className="users-list-titles">
            <span>Login</span>
            <span>Imie i nazwisko</span>
            <span>Firma</span>
            <span>E-mail</span>
            <span>Telefon</span>
          </div>
          {this.state.users.map((user) => (
            <Link to={`klient/${user.id}`} key={user.id} className={`user-link ${!user.hide ? 'show' : 'hide'}`}>
              <span>{user.login}</span>
              <span>{user.firstname} {user.lastname}</span>
              <span>{user.company}</span>
              <span>{user.email}</span>
              <span>{user.tel}</span>
            </Link>
          ))}
        </Box>
      </>
    )
  }
}

export default connect(null, {getUsers})(HomeAdmin);