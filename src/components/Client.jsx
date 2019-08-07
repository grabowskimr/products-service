import React, { Component } from "react";
import { connect } from 'react-redux';

import ProductList from './ProductList';
import Search from '../containers/Search';
import { filterUserProducts } from '../actions/actions';

class Client extends Component {

  search = (e) => {
    this.props.filterUserProducts(e.target.value);
  }

  render() {
    return (
      <>
        {this.props.children}
        <Search filterMethod={this.search} placeholder="Szukaj: Nazwa, Numer fabryczny urządzenia"/>
        <ProductList userId={this.props.userId}/>
      </>
    );
  }
}

export default connect(null, {filterUserProducts})(Client);
