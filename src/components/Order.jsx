import React, { Component } from 'react'
import { connect } from 'react-redux';

import Box from '../containers/Box';
import Input from '../containers/Input';
import OrderDetails from '../containers/OredeDetails';
import { getOrder, changeStatus, getServiceUser } from '../actions/apiCalls';
import Label from '../containers/Label';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      serviceUser: null
    };
  }

  componentDidMount() {
    this.props.getOrder({id: this.props.match.params.id}).then((data) => {
      this.setState({
        order: data
      }, () => {
        this.props.getServiceUser({id: this.state.order.service_id}).then((data) => {
          if(data && data.length) {
            this.setState({
              serviceUser: data[0]
            });
          }
        })
      })
    });
  }

  changeStatus = (e) => {
    e.preventDefault();
    if(this.state.order.resolve.length) {
      let confirmValue = window.confirm('Zmienić status?');
      if(confirmValue) {
        this.props.changeStatus({
          id: this.props.match.params.id,
          userId: this.state.order.user_id,
          type: this.state.order.type,
          productId: this.state.order.product_id,
          statusType: this.state.order.type === 'service' ? 'status_reqular_fix' : 'status',
          resolve: this.state.order.resolve,
          endDate: this.state.endDate
        }).then(() => {
          this.setState({
            order: {...this.state.order, status: 0}
          })
        });
      }
    } else {
      window.alert('Proszę uzupełnić opis');
    }
  }

  onChange = (e) => {
    let order = Object.assign(this.state.order, {resolve: e.target.value});
    this.setState({
      order: order
    })
  }

  changeDate = (date) => {
    this.setState({
      endDate: date
    })
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
          <div className="acc-row">
            {this.state.serviceUser ? <Label title="Serwisant" value={`${this.state.serviceUser.firstname} ${this.state.serviceUser.lastname}`}/> : null}
            {this.state.order.status === '0' ? <Label title="Data zakończenia" value={this.state.order.end_date}/>: null}
            {this.state.order.status === '0' ? <Label full={true} title="Opis wykonanych czynności" value={this.state.order.resolve}/> : null}
          </div>
          {this.state.order.status === '1' && <div className="order-actions">
            <form onSubmit={this.changeStatus}>
              <Input type="textarea" required label="Opis wykonanej pracy" name="description" value={this.state.order.resolve} onChange={this.onChange}/>
              <Input type="date" label="Data" value={this.state.endDate} onChange={this.changeDate} placeholder="Data" required />
              <button className="order-btn" type="submit">Zakończ zgłoszenie</button>
            </form>
          </div>}
        </OrderDetails>
      </Box>
    )
  }
}

export default connect(null, { getOrder, changeStatus, getServiceUser })(Order);