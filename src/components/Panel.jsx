import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import {connect} from 'react-redux';

import Client from './Client';
import RegisterProduct from './RegisterProduct';
import Header from './Header';
import Sidebar from './Sidebar';
import UserProduct from './UserProduct';
import PanelContent from '../containers/PanelContent';
import MainContent from '../containers/MainContent';
import ReportError from '../components/ReportError';
import HomeAdmin from './HomeAdmin';
import ClientPreview from './ClientPreview';
import { setUserId } from '../actions/actions';
import { getInitialData } from '../actions/apiCalls';

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPanel: false,
			profile: this.props.cookies.get('login').profile
		}
	}

	componentDidMount() {
		this.props.getInitialData().then((status) => {
			this.setState({
				showPanel: status
			});
		});
		if(!this.props.cookies.get('login')) {
			this.props.history.push('/');
		} else {
			this.props.setUserId(this.props.cookies.get('login').id)
		}
	}

	componentDidUpdate() {
		if(!this.props.cookies.get('login')) {
			this.props.history.push('/');
		} else {
			this.props.setUserId(this.props.cookies.get('login').id)
		}
	}


  render() {
    return (
			<>
				{this.state.showPanel &&
					<div className="panel">
						<Header />
						<PanelContent>
							<Sidebar userId={this.props.cookies.get('login') && this.props.cookies.get('login').id} />
							<MainContent>
								<Route path={`${this.props.match.url}/home`} component={this.state.profile === 'admin' ? HomeAdmin : Client} />
								<Route path={`${this.props.match.url}/register`} component={RegisterProduct} />
								<Route exact path={`${this.props.match.url}/product/:id`} component={UserProduct} />
								<Route path={`${this.props.match.url}/product/:id/report`} component={ReportError} />
								<Route path={`${this.props.match.url}/klient/:id`} component={ClientPreview} />
							</MainContent>
						</PanelContent>
				</div>}
			</>
    );
  }
}



export default connect(null, {setUserId, getInitialData})(withCookies(Panel));
