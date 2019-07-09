import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';

import Home from './Home';
import Register from './Register';
import Header from './Header';
import Sidebar from './Sidebar';
import PanelContent from '../containers/PanelContent';
import MainContent from '../containers/MainContent';

class Panel extends Component {

	componentDidUpdate() {
		if(!this.props.cookies.get('login')) {
			this.props.history.push('/');
		}
	}


  render() {
    return (
      <div className="panel">
				<Header />
				<PanelContent>
					<Sidebar />
					<MainContent>
						<Route path={`${this.props.match.url}/home`} component={Home} />
						<Route path={`${this.props.match.url}/register`} component={Register} />
					</MainContent>
				</PanelContent>
      </div>
    );
  }
}

export default withCookies(Panel);
