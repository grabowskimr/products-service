import React, { Component } from "react";
import { Route } from 'react-router-dom';

import Home from "./Home";
import Header from './Header';
import Sidebar from './Sidebar';
import PanelContent from '../containers/PanelContent';
import MainContent from '../containers/MainContent';

class Panel extends Component {
  render() {
    return (
      <div className="panel">
				<Header />
				<PanelContent>
					<Sidebar />
					<MainContent>
						<Route path={`${this.props.match.url}/home`} component={Home} />
					</MainContent>
				</PanelContent>
      </div>
    );
  }
}

export default Panel;
