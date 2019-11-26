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
import Orders from './Orders';
import Order from './Order';
import AddProduct from './AddProduct';
import Products from './Products';
import Product from './Product';
import Users from './Users';
import AddUser from './AddUser';
import ReportService from './ReportService';
import AddRecords from './AddRecords';
import PostWarrantyRepair from "./PostWarrantyRepair";
import OrderParts from "./OrderParts";
import { setUserId, hideSidebar } from '../actions/actions';
import { getInitialData } from '../actions/apiCalls';

class Panel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPanel: false,
			profile: this.props.cookies.get('login') ? this.props.cookies.get('login').profile : '',
			isAdmin: this.props.cookies.get('login') && this.props.cookies.get('login').profile === 'admin' ? true : false,
			backHome: false
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

	backToHome = () => {
		this.props.history.push(`/panel/${this.props.cookies.get('login').id}/home`);
	}

	backPrev = () => {
		window.history.back();
	}

  render() {
    return (
			<>
				{this.state.showPanel &&
					<div className="panel">
						<Header userId={this.props.cookies.get('login') && this.props.cookies.get('login').id} />
						<PanelContent>
							<Sidebar userId={this.props.cookies.get('login') && this.props.cookies.get('login').id} />
							<MainContent hideSidebar={this.props.hideSidebar}>
								{(this.props.cookies.get('login') && this.props.history.location.pathname !== `/panel/${this.props.cookies.get('login').id}/home`) ? (this.props.history.location.pathname.includes('orders/')) ?  <button className="back-arrow" onClick={this.backPrev}><span className="arrow arrow-bar is-left"></span> Wstecz</button> :  <button className="back-arrow" onClick={this.backToHome}><span className="arrow arrow-bar is-left"></span> Strona główna</button> : null}
								<Route path={`${this.props.match.url}/home`} component={this.state.profile === 'admin' ? HomeAdmin : (this.state.profile === 'coordinate' || this.state.profile === 'service') ? Orders : this.state.profile === 'adder' ? AddRecords : Client} />
								<Route path={`${this.props.match.url}/register`} component={RegisterProduct} />
								<Route exact path={`${this.props.match.url}${this.state.isAdmin ? '/klient/:userId' : ''}/product/:productId`} component={UserProduct} />
								<Route path={`${this.props.match.url}${this.state.isAdmin ? '/klient/:userId' : ''}/product/:productId/report`} component={ReportError} />
								<Route path={`${this.props.match.url}${this.state.isAdmin ? '/klient/:userId' : ''}/product/:productId/service`} component={ReportService} />
								<Route path={`${this.props.match.url}${this.state.isAdmin ? '/klient/:userId' : ''}/product/:productId/post-warranty-repair`} component={PostWarrantyRepair} />
								<Route path={`${this.props.match.url}${this.state.isAdmin ? '/klient/:userId' : ''}/product/:productId/order-parts`} component={OrderParts} />
								<Route exact path={`${this.props.match.url}/klient/:userId`} component={ClientPreview} />
								<Route exact path={`${this.props.match.url}/orders`} component={Orders} />
								<Route exact path={`${this.props.match.url}/users`} component={Users} />
								<Route path={`${this.props.match.url}/orders/:id`} component={Order} />
								<Route path={`${this.props.match.url}/edit`} component={AddProduct} />
								<Route exact path={`${this.props.match.url}/products`} component={Products} />
								<Route exact path={`${this.props.match.url}/products/:id`} component={Product} />
								<Route exact path={`${this.props.match.url}/adduser`} component={AddUser} />
								<Route exact path={`${this.props.match.url}/records`} component={AddRecords} />
							</MainContent>
						</PanelContent>
				</div>}
			</>
    );
  }
}



export default connect(null, {setUserId, getInitialData, hideSidebar})(withCookies(Panel));
