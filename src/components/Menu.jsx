import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <ul className="menu-list">
          <li><Link to="home">Home</Link></li>
          <li><Link to="register">Rejestruj urządzenie</Link></li>
          <li><Link to="/">Option 3</Link></li>
          <li><Link to="/">Option 4</Link></li>
          <li><Link to="/">Option 5</Link></li>
        </ul>
      </div>
    )
  }
}

export default Menu;