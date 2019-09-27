import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';

import { panelUrl } from '../constants/config.js';
import { toggleSidebar } from '../actions/actions';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.cookies.get('login').profile === 'admin' ? true : false,
      isEmploye: (this.props.cookies.get('login').profile === 'service' || this.props.cookies.get('login').profile === 'coordinate') ? true : false
    };
  }


  render() {
    return (
      <div className="menu">
        <ul className="menu-list">
          <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/home`}>Strona główna</Link></li>
          {this.state.isAdmin && <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/orders`}>Zgłoszenia</Link></li>}
          {(!this.state.isAdmin && !this.state.isEmploye) && <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/register`}>Rejestruj urządzenie</Link></li>}
          {this.state.isAdmin && <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/products`}>Produkty</Link></li>}
          {this.state.isAdmin && <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/edit`}>Dodaj produkt</Link></li>}
          {this.state.isAdmin && <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/users`}>Pracownicy</Link></li>}
          {this.state.isAdmin && <li onClick={this.props.toggleSidebar}><Link to={`${panelUrl}/${this.props.userId}/adduser`}>Dodaj pracownika</Link></li>}
        </ul>
      </div>
    )
  }
}

export default connect(null, {toggleSidebar})(withCookies(Menu));