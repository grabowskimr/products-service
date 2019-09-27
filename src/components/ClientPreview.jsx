import React, { Component } from 'react'
import { withCookies } from 'react-cookie';

import Client from './Client';

class ClientPreview extends Component {
  componentDidMount() {
    if(this.props.cookies.get('login').profile !== 'admin') {
      this.props.history.push(`/panel/${this.props.cookies.get('login').id}/home`);
    }
  }
  render() {
    return (
      <Client userId={this.props.match.params.userId}/>
    )
  }
}

export default withCookies(ClientPreview);