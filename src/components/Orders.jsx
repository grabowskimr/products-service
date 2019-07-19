import React, { Component } from 'react'
import { connect } from 'react-redux';

import Box from '../containers/Box';
import OrdersAcordian from '../containers/OrdersAcordian';
import { getOrders } from '../actions/apiCalls';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.props.getOrders().then((data) => {
      this.setState({
        orders: data
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

  render() {
    return (
      <Box size={100} title="Zgłoszenia" list>
        {this.state.orders.length ? 
          <OrdersAcordian items={this.state.orders} showContent={this.showContent}/> :
          <p>Brak zgłoszeń</p>
        }
      </Box>
    )
  }
}

export default connect(null, {getOrders})(Orders);