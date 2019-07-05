import React, { Component } from 'react'

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <ul className="menu-list">
          <li><a href="/">Option 1</a></li>
          <li><a href="/">Option 2</a></li>
          <li><a href="/">Option 3</a></li>
          <li><a href="/">Option 4</a></li>
          <li><a href="/">Option 5</a></li>
        </ul>
      </div>
    )
  }
}

export default Menu;