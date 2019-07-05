import React, { Component } from 'react'

import avatar from '../static/images/avatar.png';

class User extends Component {
  render() {
    return (
      <div className="user-top">
        <div className="avatar-container">
          <div className="avatar">
            <img src={avatar} alt="avatar"/>
          </div>
          <span>User</span>
        </div>
      </div>
    )
  }
}

export default User;