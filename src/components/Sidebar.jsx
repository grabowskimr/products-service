import React, { Component } from 'react'
import { connect } from 'react-redux';

import SidebarContainer from '../containers/SidebarContainer';
import Menu from './Menu';

class Sidebar extends Component {
  render() {
    return (
      <SidebarContainer show={this.props.showSidebar}>
        <h2>Menu</h2>
        <Menu userId={this.props.userId} />
      </SidebarContainer>
    )
  }
}

function mapStatetoProps(state) {
  return {
    showSidebar: state.mainReducer.showSidebar
  }
}

export default connect(mapStatetoProps, null)(Sidebar);