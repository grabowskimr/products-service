import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import { getProductInfo } from '../actions/apiCalls';
import Box from '../containers/Box';
import Label from '../containers/Label';

class UserProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      product: {
        id: '',
        name: '',
        order_date: '',
        status: '',
        status_reqular_fix: '',
        vin: '',
        wariancy: ''
      },
      isAdmin: this.props.cookies.get('login').profile === 'admin' ? true : false
    };
  }

  componentDidMount() {
    this.props.getProductInfo({
      productId: this.props.match.params.productId,
      userId: this.state.isAdmin ? this.props.match.params.userId : this.props.cookies.get('login').id
    }).then((data) => {
      this.setState({
        history: data.history,
        product: data.product
      })
    })
  }

  render() {
    return (
      <>
      <Box title="Podstawowe informacje" size={100}>
        <div className="flex-container flex-4">
          <div>
            <Label title="ID:" value={this.state.product.id} />
            <Label title="Nazwa:" value={this.state.product.name} />
          </div>
          <div>
            <Label title="Data zakupu:" value={this.state.product.order_date} />
            <Label title="Gwarancja do:" value={this.state.product.wariancy} />
          </div>
          <div>
            <Label title="Zgłoszono serwis:" value={this.state.product.status_reqular_fix === '1' ? 'Tak' : 'Nie'} />
            <Label title="Zgłoszono usterkę:" value={this.state.product.status === '1' ? 'Tak' : 'Nie'} />
          </div>
          <div>
            <Label title="Numer fabryczny urządzenia:" value={this.state.product.vin} />
          </div>
        </div>
      </Box>
      <Box title="Historia" list size={100}>
        <div className="history-labels">
          <span>ID:</span>
          <span>ID serwisanta:</span>
          <span>Data:</span>
          <span>Tytuł</span>
          <span>Opis</span>
          <span>Status</span>
          <span className="actions-column">Więcej</span>
        </div>
        {this.state.history.map((story) => (
          <div key={story.id} className="history-item">
            <span>{story.id}</span>
            <span>{story.service_id === '0' ? 'Nie przypisano' : story.service_id}</span>
            <span>{story.date}</span>
            {story.type === "service" ? <span>Serwis</span> : <span>{story.title}</span>}
            {story.type === "service" ? <span>Serwis: {story.description}</span> : <span>{story.description}</span>}
            <span>{story.status === '1' ? 'W trakcie realizacji' : 'Zakończono'}</span>
            {story.status === '0' ? <Link to={`/panel/${this.props.match.params.userId}/orders/${story.id}`} className="button more-info-btn">Szczegóły</Link> : <span className="more-info-btn"></span>}
          </div>
        ))}
      </Box>
      </>
    )
  }
}

export default connect(null, {getProductInfo})(withCookies(UserProduct));