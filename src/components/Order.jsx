import React, { Component } from 'react'
import { connect } from 'react-redux';

import Box from '../containers/Box';
import OrderDetails from '../containers/OredeDetails';
import { getOrder, changeStatus } from '../actions/apiCalls';
import Label from '../containers/Label';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {}
    };
  }

  componentDidMount() {
    this.props.getOrder({id: this.props.match.params.id}).then((data) => {
      this.setState({
        order: data
      })
    });
  }

  changeStatus = () => {
    let confirmValue = window.confirm('Zgłosić serwis?');
    if(confirmValue) {
      this.props.changeStatus({
        id: this.props.match.params.id,
        userId: this.state.order.user_id,
        type: this.state.order.type,
        productId: this.state.order.product_id,
        statusType: this.state.order.type === 'service' ? 'status_reqular_fix' : 'status'
      }).then(() => {
        this.setState({
          order: {...this.state.order, status: 0}
        })
      });
    }
  }

  render() {
    return (
      <Box title="Zgłoszenie" size={100}>
        <OrderDetails item={this.state.order}>
          <div className="acc-row">
            <Label title="Adres" value={this.state.order.address}/>
            <Label title="E-mail" value={this.state.order.email}/>
            <Label title="Telefon" value={this.state.order.tel}/>
            <Label title="Status" value={this.state.order.status === '1' ? 'Nie zakończono' : 'Zakończono'}/>
          </div>
          {this.state.order.status === '1' && <div className="order-actions">
            <button className="order-btn" onClick={this.changeStatus}>Zakończ zgłoszenie</button>
          </div>}
        </OrderDetails>
      </Box>
    )
  }
}

export default connect(null, { getOrder, changeStatus })(Order);