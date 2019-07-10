import React, { Component } from "react";
import { connect } from 'react-redux';

import Box from '../containers/Box';
import List from '../containers/List';
import ProductItemList from '../containers/ProductItemList';
import { getUserProducts } from '../actions/apiCalls';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        {name: 'Nazwa', flex: 1},
        {name: 'VIN', flex: 1},
        {name: 'Data zakupu', flex: 1},
        {name: 'Gwarancja', flex: 1},
        {name: 'Akcje', flex: 2}
      ]
    }
  }

  componentDidMount() {
    this.props.getUserProducts();
  }

  render() {
    return (
      <Box title="Lista produktów" list size={2}>
        {this.props.userProducts ?
        <List titles={this.state.titles} >
          {this.props.userProducts.map(product => (
            <ProductItemList key={product.id} product={product}/>
          ))}
        </List> : 
        <h3>Brak produktów</h3>}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProducts: state.mainReducer.userProducts
  }
}

export default connect(mapStateToProps, {getUserProducts})(ProductList);
