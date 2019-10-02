import React, { Component } from "react";
import { connect } from 'react-redux';

import ProductList from './ProductList';
import Search from '../containers/Search';
import { filterUserProducts } from '../actions/actions';
import { getUser } from '../actions/apiCalls';
import Label from '../containers/Label';
import Box from '../containers/Box';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.props.getUser({
      id: this.props.userId
    }).then(data => {
      this.setState({
        user: data
      })
    })
  }

  search = (e) => {
    this.props.filterUserProducts(e.target.value);
  }

  render() {
    return (
      <>
        {this.state.user && this.state.user.id ? <Box title="Informacje o kliencie" size={100}>
          <div className="acc-item-content">
            <div className="acc-information">
              <div className="acc-row">
                <Label title="Id" value={this.state.user.id}/>
                <Label title="Imię" value={this.state.user.firstname}/>
                <Label title="Nazwisko" value={this.state.user.lastname}/>
                <Label title="Firma" value={this.state.user.company}/>
              </div>
              <div className="acc-row">
                <Label title="Adres" value={this.state.user.address}/>
                <Label title="Kod pocztowy" value={this.state.user.postcode}/>
                <Label title="Telefon" value={this.state.user.tel}/>
                <Label title="E-mail" value={this.state.user.email}/>
              </div>
            </div>
          </div>
        </Box> : null}
        {this.props.children}
        <Search filterMethod={this.search} placeholder="Szukaj: Nazwa, Numer fabryczny urządzenia"/>
        <ProductList userId={this.props.userId}/>
      </>
    );
  }
}

export default connect(null, {filterUserProducts, getUser})(Client);
