import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Box from '../containers/Box';
import OrdersAcordian from '../containers/OrdersAcordian';
import { getOrders, getUsers, changeServiceUser } from '../actions/apiCalls';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      users: [],
      isService: this.props.cookies.get('login').profile === 'service' ? true : false
    };
  }

  componentDidMount() {
    this.props.getOrders().then((data) => {
      let filteredData = data.filter(order => order.service_id === this.props.cookies.get('login').id);
      this.setState({
        orders: this.state.isService ? filteredData : data
      })
    });
    this.props.getUsers().then((data) => {
      let serviceUsers = data.filter(user => {
        if(user.profile === 'service') {
          return user;
        }
      });
      this.setState({
        users: serviceUsers
      })
    });
  }

  showContent = (e) => {
    let items = this.state.orders.map((item) => {
      if(item.id === e.target.dataset.id) {
        item.show = !item.show;
      }
      return item;
    });
    this.setState({
      orders: items
    });
  }

  changeServiceUser = (e, id) => {
    let orders = this.state.orders.map(order => {
      if(order.id === id) {
        order.service_id = e.target.value;
      }
      return order;
    });
    this.setState({
      orders: orders
    });
    this.props.changeServiceUser({
      serviceId: e.target.value,
      id: id
    });
  }

  render() {
    return (
      <Box size={100} title="Zgłoszenia" list>
        {this.state.orders.length ? 
          <OrdersAcordian items={this.state.orders} isService={this.state.isService} showContent={this.showContent} serviceUsers={this.state.users} changeServiceUser={this.changeServiceUser}/> :
          <p>Brak zgłoszeń</p>
        }
      </Box>
    )
  }
}

export default connect(null, {getOrders, getUsers, changeServiceUser})(withCookies(Orders));