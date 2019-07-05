import React, { Component } from 'react'

import Topbar from '../containers/Topbar';
import User from './User';
import Logout from './Logout';

class Header extends Component {
  render() {
    return (
      <Topbar>
        <User />
        <Logout />
      </Topbar>
    )
  }
}

export default Header;