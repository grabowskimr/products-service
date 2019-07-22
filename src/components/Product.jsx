import React, { Component } from 'react'
import { connect } from 'react-redux';

import ProductForm from './ProductForm';
import { getProduct, updateProduct } from '../actions/apiCalls';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    this.props.getProduct({id: this.props.match.params.id}).then(data => {
      this.setState({
        product: {
          id: this.props.match.params.id,
          name: data.name,
          image: data.image,
          props: JSON.parse(data.properties)
        }
      });
    })
  }

  submit = (e, data) => {
    e.preventDefault();
    let confirmValue = window.confirm('Zapisać dane?');
    if(confirmValue) {
      this.props.updateProduct(data).then((data) => {
        if(data && data.status) {
          this.props.history.push(`/panel/${data.id}/products`);
        }
      });
    }
  }

  render() {
    return (
      <>
        {this.state.product.name && <ProductForm title="Informacje / Edycja" submit={this.submit} productData={this.state.product}/>}
      </>
    )
  }
}

export default connect(null , {getProduct, updateProduct})(Product);