import React, { Component } from 'react'
import { withCookies } from 'react-cookie';

import avatar from '../static/images/avatar.png';

class User extends Component {
  render() {
    return (
      <div className="user-top">
        <div className="avatar-container">
          <div className="avatar">
            <img src={avatar} alt="avatar"/>
          </div>
          <span>{this.props.cookies.get('login') && 'Id: ' + this.props.cookies.get('login').id + ' ' +this.props.cookies.get('login').login}</span>
        </div>
      </div>
    )
  }
}

export default withCookies(User);