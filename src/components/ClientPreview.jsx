import React, { Component } from 'react'

import Client from './Client';

class ClientPreview extends Component {
  render() {
    return (
      <Client userId={this.props.match.params.userId}/>
    )
  }
}

export default ClientPreview;