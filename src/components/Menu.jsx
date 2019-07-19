import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import { panelUrl } from '../constants/config.js';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.cookies.get('login').profile === 'admin' ? true : false
    };

  }


  render() {
    return (
      <div className="menu">
        <ul className="menu-list">
          <li><Link to={`${panelUrl}/${this.props.userId}/home`}>Home</Link></li>
          {this.state.isAdmin && <li><Link to={`${panelUrl}/${this.props.userId}/orders`}>Zgłoszenia</Link></li>}
          {!this.state.isAdmin && <li><Link to={`${panelUrl}/${this.props.userId}/register`}>Rejestruj urządzenie</Link></li>}
        </ul>
      </div>
    )
  }
}

export default withCookies(Menu);