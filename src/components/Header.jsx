import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topbar from '../containers/Topbar';
import User from './User';
import Logout from './Logout';
import { panelUrl } from '../constants/config.js';
import { toggleSidebar } from '../actions/actions';

class Header extends Component {
  render() {
    return (
      <Topbar homeLink={`${panelUrl}/${this.props.userId}/home`} toggleSidebar={this.props.toggleSidebar} >
        <User />
        <Logout />
      </Topbar>
    )
  }
}

function mapStatetoProps(state) {
  return {
    showSidebar: state.mainReducer.showSidebar
  }
}

export default connect(mapStatetoProps, {toggleSidebar})(Header);