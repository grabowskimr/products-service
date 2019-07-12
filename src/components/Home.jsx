import React, { Component } from "react";
import { connect } from 'react-redux';

import ProductList from './ProductList';
import Search from '../containers/Search';
import { filterUserProducts } from '../actions/actions';

class Home extends Component {

  search = (e) => {
    this.props.filterUserProducts(e.target.value);
  }

  render() {
    return (
      <>
        <Search filterMethod={this.search}/>
        <ProductList />
      </>
    );
  }
}

export default connect(null, {filterUserProducts})(Home);
