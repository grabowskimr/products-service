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

  render() {
    return (
      <>
        <Search />
        <Box title="Klienci" list size={100}>
          {this.state.users.map((user) => (
            <Link>{user.login}</Link>
          ))}
        </Box>
      </>
    )
  }
}

export default connect(null, {getUsers})(HomeAdmin);