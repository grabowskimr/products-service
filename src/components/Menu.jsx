import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { panelUrl } from '../constants/config.js';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <ul className="menu-list">
          <li><Link to={`${panelUrl}/${this.props.userId}/home`}>Home</Link></li>
          <li><Link to={`${panelUrl}/${this.props.userId}/register`}>Rejestruj urządzenie</Link></li>
        </ul>
      </div>
    )
  }
}

export default Menu;