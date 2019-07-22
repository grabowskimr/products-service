import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Box from '../containers/Box.jsx';
import Search from '../containers/Search';
import { getProducts } from '../actions/apiCalls';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.props.getProducts().then(data => {
      this.setState({
        products: data
      });
    })
  }

  search = (e) => {
    let products = this.state.products;
    let searchText = e.target.value.toUpperCase();
    products.map((product) => {
      var show = (product.id.toUpperCase().includes(searchText)) || (product.name.toUpperCase().includes(searchText));
      if(show) {
        product.hide = false;
      } else {
        product.hide = true;
      }
      return product;
    })
    this.setState({
      products: products
    });
  }

  render() {
    return (
      <>
        <Search filterMethod={this.search} placeholder="Szukaj: id, nazwa" />
        <Box title="Produkty" list size={100}>
          <div className="products-list-titles">
            <span className="size-1">Id</span>
            <span>Nazwa</span>
          </div>
          {this.state.products.map((product) => (
            <Link to={`products/${product.id}`} key={product.id} className={`product-link ${!product.hide ? 'show' : 'hide'}`}>
              <span className="size-1">{product.id}</span>
              <span>{product.name}</span>
            </Link>
          ))}
        </Box>
      </>
    )
  }
}

export default connect(null, {getProducts})(Products);
